import http from 'http';
import { Logger } from '@util';
import app from './app';

/**
 * Node Server
 * @module Server
 */

/**
 * Normalize a port into a number, string, or false.
 * @param  {Number} val
 * @author @Radi @Shokr
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 * @author @Radi @Shokr
 */
const PORT = normalizePort(process.env.PORT || '3000');
app.set('port', PORT);

/**
 * Create HTTP server.
 * @author @Radi @Shokr
 */
const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 * @author @Radi @Shokr
 */
const onError = err => {
  if (err.syscall !== 'listen') {
    throw err;
  }
  const bind = typeof port === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;
  switch (err.code) {
    case 'EACCES':
      Logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      Logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw err;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 * @author @Radi @Shokr
 */
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  Logger.info(`Listening on ${bind}`);
};

/**
 * Listen on provided port, on all network interfaces.
 * @author @Radi @Shokr
 */
server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);

module.exports = server;
