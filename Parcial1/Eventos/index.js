const events = require('events');

function saludar() {
  const emisor = new events.EventEmitter();

  setTimeout(() => emisor.emit('Saludo', 'Belen'), 5000);
  setTimeout(() => emisor.emit('Saludo', 'Juan'), 8000);
  setTimeout(() => emisor.emit('Saludo', 'Pedro'), 4000);
  setTimeout(() => emisor.emit('Saludo', 'Maria'), 2000);

  return emisor;
}

let sal = saludar();

sal.on('Saludo', (nombre) => {
  console.log('Saludo de: ' + nombre);
});
