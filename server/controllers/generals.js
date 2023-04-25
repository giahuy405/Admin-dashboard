import OverallStat from "../models/OverallStats.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import { errorCode, successCode } from "../utils/response.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    successCode(res, "get user successfully", user);
  } catch (err) {
    errorCode(res);
  }
};
export const getDashboardStat = async (req, res) => {
  try {
    // hardcoded values
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    /* Recent Transactions */
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 }); // sắp xếp theo thứ tự giảm dần

    /* Overall Stats */
    const overallStat = await OverallStat.findOne({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat;

    const thisMonthStats = overallStat.monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat.dailyData.find(({ date }) => {
      return date === currentDay;
    });
    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (err) {
    errorCode(res);
  }
};
