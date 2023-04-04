import Teams from './teamModel';
import Matches from './matchesModel';
import ILeaderboard from '../../interfaces/ILeaderboard';

export default class AwayStats implements ILeaderboard {
  team: Teams;
  matches: Matches[];
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;

  constructor(team: Teams, matches: Matches[]) {
    this.team = team;
    this.matches = matches;
    this.name = team.teamName;
    this.totalVictories = this.getTotalVictories();
    this.totalDraws = this.getTotalDraws();
    this.totalPoints = (this.totalVictories * 3) + this.totalDraws;
    this.totalGames = this.getTotalGames();
    this.totalLosses = this.getTotalLosses();
    this.goalsFavor = this.getGoalsFavor();
    this.goalsOwn = this.getGoalsOwn();
  }

  getTotalGames() {
    let games = 0;
    this.matches.forEach((match) => {
      if (this.team.id === match.awayTeamId && match.inProgress === false) {
        games += 1;
      }
    });
    return games;
  }

  getTotalVictories() {
    let wins = 0;
    this.matches.forEach((match) => {
      if (this.team.id === match.awayTeamId
        && match.inProgress === false
        && match.awayTeamGoals > match.homeTeamGoals
      ) {
        wins += 1;
      }
    });
    return wins;
  }

  getTotalDraws() {
    let draws = 0;
    this.matches.forEach((match) => {
      if (this.team.id === match.awayTeamId
        && match.inProgress === false
        && match.awayTeamGoals === match.homeTeamGoals
      ) {
        draws += 1;
      }
    });
    return draws;
  }

  getTotalLosses() {
    let losses = 0;
    this.matches.forEach((match) => {
      if (this.team.id === match.awayTeamId
        && match.inProgress === false
        && match.homeTeamGoals < match.awayTeamGoals
      ) {
        losses += 1;
      }
    });
    return losses;
  }

  getGoalsFavor() {
    let goalsFavor = 0;
    this.matches.forEach((match) => {
      if (this.team.id === match.awayTeamId
        && match.inProgress === false
      ) {
        goalsFavor += match.awayTeamGoals;
      }
    });
    return goalsFavor;
  }

  getGoalsOwn() {
    let goalsOwn = 0;
    this.matches.forEach((match) => {
      if (this.team.id === match.awayTeamId
        && match.inProgress === false
      ) {
        goalsOwn += match.homeTeamGoals;
      }
    });
    return goalsOwn;
  }
}
