import Teams from './teamModel';
import Matches from './matchesModel';
import ILeaderboard from '../../interfaces/ILeaderboard';
import GeralStats from './geralStatsModel';

export default class AwayLeaderboard {
  private _teams: Teams[];
  private _matches: Matches[];
  private _leaderboard: ILeaderboard[];

  constructor(teams: Teams[], matches: Matches[]) {
    this._teams = teams;
    this._matches = matches;
    this._leaderboard = this.createLeaderboard();
  }

  public get leaderboard(): ILeaderboard[] {
    return this._leaderboard;
  }

  public createLeaderboard() {
    return this._teams
      .map((geralTeam) => {
        const teamStats = new GeralStats(geralTeam, this._matches);
        const { matches, team, ...stats } = teamStats;
        return stats;
      });
  }
}
