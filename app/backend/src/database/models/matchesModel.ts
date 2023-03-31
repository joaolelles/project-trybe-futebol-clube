import { INTEGER, Model, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './teamModel';

class Matches extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeamId: {
    field: 'home_team_id',
    allowNull: false,
    type: INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    primaryKey: true,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    field: 'away_team_id',
    allowNull: false,
    type: INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    primaryKey: true,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    field: 'in_progress',
    type: BOOLEAN,
  },
}, {
  sequelize: db,
  timestamps: false,
  modelName: 'users',
});

Teams.belongsTo(Matches, { foreignKey: 'id', as: 'homeTeamId' });
Teams.belongsTo(Matches, { foreignKey: 'id', as: 'awayTeamId' });

Matches.hasMany(Teams, { foreignKey: 'home_team_id', as: 'homeTeamId' });
Matches.hasMany(Teams, { foreignKey: 'away_team_id', as: 'awayTeamId' });

export default Matches;
