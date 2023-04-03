import { ModelStatic } from 'sequelize';
import Matches from '../database/models/matchesModel';
import Teams from '../database/models/teamModel';

export default class MatchesService {
  matchesModel: ModelStatic<Matches>;
  teamModel: ModelStatic<Teams>;

  constructor(
    matchesModel: ModelStatic<Matches>,
    teamModel: ModelStatic<Teams>,
  ) {
    this.matchesModel = matchesModel;
    this.teamModel = teamModel;
  }

  getAll = async (inProgress: string | undefined): Promise<Matches[]> => {
    const matches = await this.matchesModel.findAll({
      include: [
        {
          model: this.teamModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: this.teamModel,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        }],
    });
    if (inProgress) {
      return matches.filter((matche) => matche.inProgress === JSON.parse(inProgress.toLowerCase()));
    }
    return matches;
  };
}
