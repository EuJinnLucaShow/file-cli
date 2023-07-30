const argv = require('yargs').argv;
const { creatFile, getFiles, getInfo } = require('./files')

function invokeAction({ action, filename, content }) {
  switch (action) {
    case 'create':
      creatFile(filename, content)
          
      break;

    case 'get':
      getFiles()
      break;

    case 'getInfo':
      getInfo(filename)
      break;    

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);