import { Connection, createConnection, getConnection } from "typeorm";

let connectionReadyPromise: Promise<Connection> | null = null;

const prepareConnection = (entities: Function[]): Promise<Connection> => {
  if (!connectionReadyPromise) {
    connectionReadyPromise = (async () => {
      // clean up old connection that references outdated hot-reload classes
      try {
        const staleConnection = getConnection();
        await staleConnection.close();
      } catch (error) {
        // no stale connection to clean up
      }

      // wait for new default connection
      let ormconfig = require('../ormconfig');
      ormconfig.entities = entities;
      return createConnection(ormconfig);
    })();
  }

  return connectionReadyPromise;
}

export default prepareConnection;