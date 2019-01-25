const descripcion = {
  demand: true,
  alias: 'd',
  desc: 'Describe la tarea por hacer'
}
const actualizar = {
  default: true,
  alias: 'c',
  desc: 'Marca como completado o pendiente la tarea'
}
const completada = {
  default: '*',
  alias: 'c',
  desc: 'Lista solo las tareas ya completadas'
}

const argv = require('yargs')
  .command('crear','Crear una tarea por hacer',{descripcion} )
  .command('listar','Muestra todas las tareas con su estado', {completada})
  .command('actualizar','Actualiza el estado de una tarea por hacer', {descripcion, actualizar})
  .command('borrar', 'Elimina una tarea por hacer', {descripcion})
  .help()
  .argv;

module.exports = {
  argv
}
