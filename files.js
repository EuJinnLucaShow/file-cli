const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');
const dataValidator = require('./helpers/dataValidator')
const checkExtension = require('./helpers/checkExtension')

const creatFile = async (filename, content) => {
    const file = { 
        filename,
        content
    }
    const result = dataValidator(file)
    if (result.error) { 
        const error = result.error.details;
        const [path] = error[0].path              
        console.log(chalk.red(`please specify '${path}' parametr`))
        return;
    } 
    const chack = checkExtension(filename);
    if (!chack.result) {
 console.log(chalk.red(`sorry this app dont support '${chack.extation}' extension`))
        return;
    } 
    const filePhas = path.join(__dirname, 'files', filename)
    try {
        await fs.writeFile(filePhas, content, 'utf-8')
        console.log(chalk.green('file created successful'))
    }
    catch (error) { 
        console.log(error)
    } 
} 
 
const getFiles = async () => { 
    const pathFolder = path.join(__dirname, 'files')
    const wrFile = await fs.readdir(pathFolder)
    if (wrFile.length === 0) { 
        return console.log('No files in this folder')
    }
    console.log(wrFile)
}

const getInfo = async (filename) => { 
    const pathFolder = path.join(__dirname, 'files')
    const wrFile = await fs.readdir(pathFolder)

    if (!wrFile.includes(filename)) { 
        return console.log(chalk.red(`${filename} is not in this folder `))
    }
    const pathFile = path.join(__dirname, 'files', filename )
    const infoData = await fs.readFile(pathFile, 'utf8')
    console.log(infoData)
    
    

}

module.exports = {
    creatFile,
    getFiles,
    getInfo
};