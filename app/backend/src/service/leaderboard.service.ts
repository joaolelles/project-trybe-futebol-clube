import { ModelStatic } from 'sequelize';
import GeralLeaderboard from '../database/models/geralLeaderboardModel';
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

  geralCreateLeaderboard = async () => {
    const teams = await Teams.findAll();
    const matches = await Matches.findAll();
    const leaderboard = new GeralLeaderboard(teams, matches);
    const newLeaderboard = leaderboard.createLeaderboard();
    const classification = newLeaderboard.sort((a, b) => {
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalPoints > b.totalPoints) return -1;

      if (a.totalVictories < b.totalVictories) return 1;
      if (a.totalVictories > b.totalVictories) return -1;

      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;

      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;

      return 0;
    });
    return classification;
  };

  homeDreateLeaderboard = async () => {
    const teams = await Teams.findAll();
    const matches = await Matches.findAll();
    const leaderboard = new HomeLeaderboard(teams, matches);
    const newLeaderboard = leaderboard.createLeaderboard();
    const classification = newLeaderboard.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;

      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;

      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;

      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;

      return 0;
    });
    return classification;
  };

  awayCreateLeaderboard = async () => {
    const teams = await Teams.findAll();
    const matches = await Matches.findAll();
    const leaderboard = new AwayLeaderboard(teams, matches);
    const newLeaderboard = leaderboard.createLeaderboard();
    const classification = newLeaderboard.sort((a, b) => {
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalPoints > b.totalPoints) return -1;

      if (a.totalVictories < b.totalVictories) return 1;
      if (a.totalVictories > b.totalVictories) return -1;

      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;

      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;

      return 0;
    });
    return classification;
  };
}
