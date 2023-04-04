import { ModelStatic } from 'sequelize';
import HomeLeaderboard from '../database/models/homeLeaderboardModel';
import Matches from '../database/models/matchesModel';
import Teams from '../database/models/teamModel';

export default class LeaderBoardService {
  matchesModel: ModelStatic<Matches>;
  teamModel: ModelStatic<Teams>;

  constructor(
    teamModel: ModelStatic<Teams>,
    matchesModel: ModelStatic<Matches>,
  ) {
    this.teamModel = teamModel;
    this.matchesModel = matchesModel;
  }

  createLeaderboard = async () => {
    const teams = await Teams.findAll();
    const matches = await Matches.findAll();
    const leaderboard = new HomeLeaderboard(teams, matches);
    return leaderboard.createLeaderboard();
  };
}
