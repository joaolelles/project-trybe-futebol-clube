import Teams from '../database/models/indexModels';
import teamModel from '../database/models/teamModel';

const getAll = async (): Promise<Teams[]> => {
  const allTeams = await teamModel.findAll();
  console.log(allTeams);
  return allTeams;
};

export default {
  getAll,
};
