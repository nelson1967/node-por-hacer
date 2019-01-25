const fs = require('fs');

listadoPorHacer = [];

let guardarDB = () => {
  let data = JSON.stringify(listadoPorHacer);
  fs.writeFile('db/data.json', data, (err) => {
    if (err) throw new Error('Hay un error al grabar el archivo');
    // console.log('El archivo fue grabado...');
  });
}

let cargarDB = () => {
  try {
    listadoPorHacer = require('../db/data.json');
  } catch (e) {
    listadoPorHacer = [];
  }
  // console.log('Tareas por hacer cargadas:', listadoPorHacer);
}

let crearTarea = (descripcion) => {
  cargarDB();
  let porHacer = {
    descripcion,
    completado: false
  };
  listadoPorHacer.push(porHacer);
  guardarDB();
  return porHacer;
}
let borrarTarea = (descripcion) => {
  cargarDB();
  let index = listadoPorHacer.findIndex(tarea => {return tarea.descripcion === descripcion});
  if (index >= 0) {
    let tareaEliminada = listadoPorHacer.splice(index,1);
    guardarDB();
    console.log('Se ha eliminado la tarea: ', tareaEliminada);
    return true
  } else {
    console.log('Tarea no existe: ', descripcion);
    return false;
  }
}
let getListado = (completado='*') => {
  console.log('Estado de tarea requerido: ', completado);
  cargarDB();
  switch (completado) {
    case true:
      porHacer = listadoPorHacer.filter(tarea => {return tarea.completado === true});
      break;
    case false:
      porHacer = listadoPorHacer.filter(tarea => {return tarea.completado === false});
      break;
    default:
      porHacer = listadoPorHacer;
  }
  return porHacer;
}

let actualizar = (descripcion, completado=true) => {
  cargarDB();
  let index = listadoPorHacer.findIndex(tarea => {return tarea.descripcion === descripcion});
  if (index >= 0) {
    listadoPorHacer[index].completado = completado;
    guardarDB();
    return true;
  }
  else {
    return false;
  }
}

let formateaString = (cadena, longitud=30) => {
  switch (typeof(cadena)) {
    case 'boolean':
      return cadena
      break;
    case 'string':
      let rtnCadena = '';
      for (var i = 0; i < longitud && i < cadena.length; i++) {
        rtnCadena = rtnCadena + cadena[i].toString();
      }
      if (i < longitud) {
        for (let j = i; j < longitud; j++) {
          rtnCadena = rtnCadena + ' ';
        }
      }
      return rtnCadena;
      break;
    default:
      console.log('Tipo de dato desconocido');
      return `Tipo de dato ${typeof(cadena)} desconocido`;
  }
}

module.exports = {
  crearTarea,
  getListado,
  actualizar,
  borrarTarea,
  formateaString
}
