import { ModelStatic } from 'sequelize';
import Matches from '../database/models/matchesModel';
import Teams from '../database/models/teamModel';
import IMatchBody from '../interfaces/IMatchBody';

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
          as: 'awayMatch',
          attributes: { exclude: ['id'] },
        },
        {
          model: this.teamModel,
          as: 'homeMatch',
          attributes: { exclude: ['id'] },
        }],
    });
    if (inProgress) {
      return matches.filter((match) => match.inProgress === JSON.parse(inProgress.toLowerCase()));
    }
    return matches;
  };

  endMatch = async (id: number) => {
    await this.matchesModel
      .update({ inProgress: false }, { where: { id } });
  };

  upMatchResult = async (scoreHome: number, scoreAway: number, id: number) => {
    const match = await this.matchesModel.findByPk(id);
    match?.update({ homeTeamGoals: scoreHome, awayTeamGoals: scoreAway });
    return match;
  };

  postNewMatch = async (match: IMatchBody) => {
    const matchCreated = await this.matchesModel.create({ ...match, inProgress: true });
    return matchCreated;
  };
}
