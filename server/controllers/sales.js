import OverallStat from "../models/OverallStats.js";

export const getSales = async (req, res) => {
  try {
    const overallStats = await OverallStat.find();

  res.status(200).json(overallStats[0])
  } catch (err) {
    errorCode(res);
  }
};
 
