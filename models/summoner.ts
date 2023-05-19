import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

interface SummonerAttributes {
  id: string;
  summonerId: string;
  accountId: string;
  puuid: string;
  name: string;
  summonerLevel: number;
  revisionDate: number;
  profileIconId: number;
}

interface SummonerCreationAttributes
  extends Optional<SummonerAttributes, 'id'> { }

interface SummonerInstance
  extends Model<SummonerAttributes, SummonerCreationAttributes>,
  SummonerAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Summoner = sequelize.define<SummonerInstance>(
  'Summoner',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
    },
    summonerId: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    accountId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    puuid: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    summonerLevel: {
      allowNull: false,
      type: DataTypes.NUMBER,
    },
    revisionDate: {
      allowNull: false,
      type: DataTypes.NUMBER,
    },
    profileIconId: {
      allowNull: false,
      type: DataTypes.NUMBER,
    }
  }
);

export default Summoner;