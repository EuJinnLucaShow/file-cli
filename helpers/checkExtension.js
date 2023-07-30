function checkExtension(filename) { 
    const EXTACTIONS = ['txt', 'js', 'json', 'html', 'css']
    const arrs = filename.split('.')
    const ext = arrs[arrs.length -1]   
    
      return {
          extation: ext,
            result: EXTACTIONS.includes(ext)
    }
}

module.exports = checkExtension;