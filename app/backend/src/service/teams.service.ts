import { ModelStatic } from 'sequelize';
import Teams from '../database/models/indexModels';

export default class TeamService {
  _model: ModelStatic<Teams>;

  constructor(model: ModelStatic<Teams>) {
    this._model = model;
  }

  getAll = async (): Promise<Teams[]> => {
    const allTeams = await this._model.findAll();
    return allTeams;
  };

  getTeam = async (id: number) => {
    const team = await this._model.findByPk(id);
    return team;
  };
}
