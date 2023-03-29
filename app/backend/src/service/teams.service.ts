import Teams from '../database/models/indexModels';
import teamModel from '../database/models/teamModel';

const getAll = async (): Promise<Teams[]> => {
  const allTeams = await teamModel.findAll();
  return allTeams;
};

const getTeam = async (id: number) => {
  const team = await teamModel.findByPk(id);
  return team;
};

export default {
  getAll,
  getTeam,
};
