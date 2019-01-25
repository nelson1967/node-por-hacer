const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');
const colors = require('colors');

// console.log(argv);

let comando = argv._[0];
console.log('Los argumentos para el comando son:', argv);
switch (comando) {
  case 'crear':
    let tarea = porHacer.crearTarea(argv.descripcion);
    console.log('Se ha creado tarea por hacer: ', tarea);
    break;
  case 'actualizar':
    let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
    console.log(actualizado);
    break;
  case 'listar':
    let listado = porHacer.getListado(argv.completada);
    console.log('========== Tareas por hacer =========='.green);
    console.log('-------- Descripción --------+----- Completada -----'.green, argv.completada);
    for (let tarea of listado) {
      console.log(porHacer.formateaString(tarea.descripcion), '   ', porHacer.formateaString(tarea.completado));
    }
    break;
  case 'borrar':
    console.log('Se elimina tarea');
    let borrada = porHacer.borrarTarea(argv.descripcion);
    console.log('Se ha eliminado tarea por hacer: ', borrada);
    break;
  default:
    console.log('Comando no reconocido');
}
