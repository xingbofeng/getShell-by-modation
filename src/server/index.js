import Hapi from 'hapi';
import h2o2 from 'h2o2';
import inert from 'inert';
import main from './handlers/main';
import staticFiles from './handlers/staticFiles';
import name from './handlers/name';
import * as socket from './socket';

/**
 * Start Hapi server on port 8000.
 */
const host = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 8000;
const server = new Hapi.Server();

server.connection({ host, port });
server.register(
  [h2o2, inert, socket], (err) => {
    if (err) throw err;
  }
);

server.route([main, staticFiles, name]);

export function runServer() {
  server.start(() => {
    /* eslint no-console:0 */
    console.info(`==> 🌎  Go to ${server.info.uri.toLowerCase()}`);
  });
}

if (process.env.NODE_ENV === 'production') {
  runServer();
}

export default {
  server,
  runServer,
};

