import * as Mongoose from 'mongoose';

export class Database {
  private static async connect(connection: string): Promise<typeof Mongoose> {
    try {
      const mongoose = await Mongoose.connect(connection, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      mongoose.connection.on('error', err => {
        console.log(err.message);
        throw err;
      });
      return mongoose;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  public static async run(connection: string, func: () => Promise<any>) {
    let database = null;
    try {
      database = await Database.connect(connection);
      return await func();
    } finally {
      if (database)
        database.connection.close();
    }
  }
}
