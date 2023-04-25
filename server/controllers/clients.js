import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import { errorCode, failCode, successCode } from "../utils/response.js";
import getCountryIso3 from "country-iso-2-to-3";
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    // sau khí lấy dc product tìm nó trong mảng product Stats
    // dùng promise.all trong mongoDB nó phải return ._doc

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );

    successCode(res, "get products successfully", productsWithStats);
  } catch (err) {
    errorCode(res);
  }
};
export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    successCode(res, "custommers ok", customers);
  } catch (error) {
    errorCode(res);
  }
};
export const deletedCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    // Check if the user ID is valid -not working
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return failCode(res);
    // }

    // Find the user by ID and delete it
    const deletedUser = await User.findByIdAndDelete(id);

    // If the user doesn't exist, return a 404 response
    if (!deletedUser) {
      return failCode(res);
    }

    successCode(res, "get customers successfully", "");
  } catch (err) {
    errorCode(res);
  }
};

// pagination
export const getTransaction = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
      };
      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    // const transactions = await Transaction.find({
    //   $or: [
    //     { cost: { $regex: new RegExp(search, "i") } },
    //     { userId: { $regex: new RegExp(search, "i") } },
    //   ],
    // })
    //   .sort(sortFormatted)
    //   .skip(page * pageSize)
    //   .limit(pageSize);

    const transactions = await Transaction.find()
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments();

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Transaction.findByIdAndDelete(id);

    // If the user doesn't exist, return a 404 response
    if (!deleted) {
      return failCode(res);
    }

    successCode(res, "get customers successfully", "");
  } catch (err) {
    errorCode(res);
  }
};
export const getGeography = async (req, res) => {
  try {
    const users = await User.find();
    // dùng destructuring assignment để lấy {country} sau đó dùng hàm getCountryIso3 để có đc countryISO3
    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
