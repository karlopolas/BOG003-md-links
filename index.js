const path = require('path');
const fs = require('fs');
const Filehound = require('filehound');
const markdownLinkExtractor = require('markdown-link-extractor');

//Verificar si la ruta es de archivo o directorio
const isFile = (absolutePath) =>  {
  return new Promise((resolve, reject) => {
    fs.promises.lstat(absolutePath)
    .then((stats) => {
      resolve(stats.isFile())
    }).catch((err) => {
      reject(err)
    })
  })
};

//Obtener el archivo md de la ruta
const getMdFile = (absolutePath) => {
  return new Promise((resolve, reject) => {
    let mdFiles = [];
    if(path.extname(absolutePath) === '.md'){
      mdFiles.push(absolutePath);
      resolve(mdFiles);
    }else{
      reject(`${absolutePath} no es un archivo .md`)
    }
  }) 
};

//Obtener los archivos md del directorio
const getMDFilesPathsFromFolder = (folderPath) => {
  return new Promise((resolve, reject) => {
    Filehound.create()
    .paths(folderPath)
    .ext('md')
    .find()
    .then((files) => { 
      if(files.length === 0){
        reject('No hay archivos .md en el directorio')
      }else if(files.length >= 1){
        resolve(files) 
      }
    })
  })
};

//Función para leer el archivo 
const extractTextFromFile = (mdFiles) => {
  const promisesArray = mdFiles.map( file => fs.promises.readFile(file, 'utf8'));
  return Promise.all(promisesArray)
};

//Función para extraer links
const getLinksInfo = (filesText, ) => {
  return new Promise((resolve, reject) => {
    let LinksInfo = [];
    for (const text of filesText){
      const info = markdownLinkExtractor(text, true);

      if(info.length >= 1){  
        LinksInfo = LinksInfo.concat(info);
      }
    }

    if(LinksInfo.length ===  0){
      reject('No se encontraron links')
    }else if(LinksInfo.length >= 1){
      resolve(LinksInfo)
    }    
  })
};



const mdLinks = (inputPath) => {
  //Obtener ruta absoluta
  const absolutePath = path.isAbsolute(inputPath) ? inputPath : path.resolve(process.cwd(), inputPath);

  //verificar si la ruta existe
  const pathExist = fs.existsSync(absolutePath);
  if(!pathExist){
    console.log('Error: Ruta no existe. Ingresa una ruta válida.');
    process.exit(1);
  }

  //Verificar si la ruta es de un archivo
  isFile(absolutePath)
  .then((isFile) => {
    //si es archivo
    if(isFile){
      return getMdFile(absolutePath)
    }else{
      //si es directorio
      return getMDFilesPathsFromFolder(absolutePath)
    }  
  })
  .then((mdFiles) => {
    return extractTextFromFile(mdFiles)
  })
  .then((filesText) => {
    return getLinksInfo(filesText)
  })
  .then((linksInfo) => {
    console.log(linksInfo);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })

};

mdLinks('/Users/karenp/Desktop/randomFiles');

/* /Users/karenp/Desktop/randomFiles2 */
/* /Users/karenp/Desktop/randomFiles/recetas.md */
/* /Users/karenp/Desktop/randomFiles */
/* /Users/karenp/Desktop/randomFiles/subcarpeta/coolMarkdown.md */

//-----------------------------------------------

/* //Obtener los archivos md del directorio
const getMDFilesPathsFromFolder = (folderPath) => {
  return new Promise ((resolve, reject) => {
    const content = fs.readdirSync(folderPath);
    let mdFiles = [];
    for (const element of content) {
      const pathElement = path.resolve(folderPath, element);
      if (fs.lstatSync(pathElement).isFile()) {
        if (path.extname(pathElement) === ".md") {
          mdFiles.push(pathElement);
        }
      } else {
        getMDFilesPathsFromFolder(pathElement).then((newFiles) => {
          mdFiles = mdFiles.concat(newFiles);
          console.log('mdfiles DESPUES concat ', mdFiles);
        })
      }
    }
    
    if(mdFiles.length === 0){
      reject('No hay archivos .md')
    }else if(mdFiles.length >= 1){
      console.log('mdfiles antes de resolve ', mdFiles);
      resolve(mdFiles)
    }
  })
}; */

//------------------------------------------------

/* const { readFile, readdir } = require('fs/promises');
const { extname, join, isAbsolute } = require('path');

const readFileContent = (path)=>{
  return new Promise ((resolve, reject)=>{
    readFile(path, 'utf8')
    .then((fileContent)=>{
      resolve(fileContent)
    }).catch((err)=>{
      reject(`Falló la lectura del archivo ${err}`)
      })
  })
};

readFileContent('./randomFiles/sampleText.md').then((result)=>{
  console.log(result);
})


readFile('./randomFiles')
.then((fileContent)=>{
  console.log(`Este es el contenido del archivo: ${fileContent}`);
  console.log(typeof fileContent);
}).catch((err)=>{
  console.log(`Hubo un error ${err}`);
})


const fileExt = extname('./randomFiles/sampleText.md');
console.log(`Esta es la extensión del archivo: ${fileExt}`);
  

readdir('./randomFiles')
.then((fileNames)=>{
  console.log(`Este es el contenido del directorio: ${fileNames}`);
  console.log(typeof fileNames);
}).catch((err)=>{
  console.log(`Hubo un error ${err}`);
})


const absolutePath = join(process.cwd(), './randomFiles/sampleText.md')
console.log(`Esta es la ruta absoluta: ${absolutePath}`);
//También se puede usar con path.resolve


const isPathAbsolute = isAbsolute(process.cwd())
console.log('¿Es Ruta absoluta?:', isPathAbsolute) */


/* module.exports = () => {
  //mdLinks
}; */
