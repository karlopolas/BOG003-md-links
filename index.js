const path = require('path');
const fs = require('fs');

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
    if(isFile){
      return getMdFile(absolutePath)
    }else{
      //obtener files from directory
    }  
  })
  .then((mdFiles) => {
    console.log('Archivo de file path ', mdFiles);
    //función para extraer links
  })
  .catch((err) => {
    console.log(err);
  })
 
}

mdLinks('/Users/karenp/Desktop/randomFiles/recetas.md');

/* /Users/karenp/Desktop/randomFiles2 */
/* /Users/karenp/Desktop/randomFiles/recetas.md */
/* /Users/karenp/Desktop/randomFiles */



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
