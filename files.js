const fs = require('fs/promises');
const path = require('path');
const dataValidator = require('./helpers/dataValidator')
const checkExtension = require('./helpers/checkExtension')

const creatFile = async (req, res) => {
    const { 
        filename,
        content
    } = req.body

    const result = dataValidator(req.body)
    if (result.error) { 
        const error = result.error.details;
        const [path] = error[0].path              
        res.status(400).json({ message: `please specify '${path}' parametr` });
    } 
    const chack = checkExtension(filename);
    if (!chack.result) {
    res.status(400).json({ message: `sorry this app dont support '${chack.extation}' extension` });
    } 
    const filePhas = path.join(__dirname, 'files', filename)
    try {
        await fs.writeFile(filePhas, content, 'utf-8')
    res.status(201).json({ message: 'file created successful' })
    }
    catch (error) { 
        console.log(error)
    } 
} 

const getFiles = async (req, res) => { 
    const pathFolder = path.join(__dirname, 'files')
    const wrFile = await fs.readdir(pathFolder)
    if (wrFile.length === 0) { 
        res.status(404).json({ message: 'No files in this folder'})
    }
    res.json(wrFile)
}

const getInfo = async (req, res) => { 
    const { filename } = req.params
    const pathFolder = path.join(__dirname, 'files')
    const wrFile = await fs.readdir(pathFolder)

    if (!wrFile.includes(filename)) { 
        res.status(404).json({ message: `${filename} is not in this folder ` })
    }
    const pathFile = path.join(__dirname, 'files', filename )
    const infoData = await fs.readFile(pathFile, 'utf8')
    const extName = path.extname(pathFile)    
    const baseName = path.basename(pathFile, extName);
    res.json({name:baseName, extension:extName.slice(1), content:infoData })
    }

module.exports = {
    creatFile,
    getFiles,
    getInfo
};