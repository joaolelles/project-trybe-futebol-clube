import { ModelStatic } from 'sequelize';
import HomeLeaderboard from '../database/models/homeLeaderboardModel';
import AwayLeaderboard from '../database/models/awayLeaderboardModel';
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

  homeDreateLeaderboard = async () => {
    const teams = await Teams.findAll();
    const matches = await Matches.findAll();
    const leaderboard = new HomeLeaderboard(teams, matches);
    return leaderboard.createLeaderboard();
  };

  awayCreateLeaderboard = async () => {
    const teams = await Teams.findAll();
    const matches = await Matches.findAll();
    const leaderboard = new AwayLeaderboard(teams, matches);
    return leaderboard.createLeaderboard();
  };
}
