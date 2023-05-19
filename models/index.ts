import Env from '../Env';
import { Sequelize } from 'sequelize';

if (!Env.DB_URL) throw new Error('No DB_URL defined!');

const sequelize = new Sequelize(Env.DB_URL, {
  pool: { max: 10 }
});

export { Sequelize, sequelize };