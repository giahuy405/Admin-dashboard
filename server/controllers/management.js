import mongoose from "mongoose";
import User from "../models/User.js";
import { errorCode, successCode } from "../utils/response.js";
import Transaction from "../models/Transaction.js";
export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");

    res.status(200).json(admins);
  } catch (err) {
    errorCode(res);
  }
};
export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    // lấy id của thằng admin 
    const user = await User.findById(id);
    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats",  
          localField: "_id",       // trong database ta đang đứng ở bảng User thì local là _id
          foreignField: "userId",  // so sánh với id của table affiliates 
          as: "affiliateStats",    
        },
      },
      { $unwind: "$affiliateStats" }, // 
    ]);
    console.log("🚀 ~ file: management.js:31 ~ getUserPerformance ~ user:", user)
    console.log("🚀 ~ file: management.js:31 ~ getUserPerformance ~ userWithStats:", userWithStats[0])

    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );
    console.log("🚀 ~ file: management.js:40 ~ getUserPerformance ~ saleTransactions:", saleTransactions)

    // lọc mấy cái ko có transaction
    const filteredSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    );
    console.log("🚀 ~ file: management.js:46 ~ getUserPerformance ~ filteredSaleTransactions:", filteredSaleTransactions)


    res.status(200).json({ user: userWithStats[0], sales: filteredSaleTransactions });
  } catch (err) {
    errorCode(res);
  }
};
