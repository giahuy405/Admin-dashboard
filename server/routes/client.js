import express from "express";
import {
  getProducts,
  getCustomers,
  deletedCustomer,
  getTransaction,
  deleteTransaction,
  getGeography,
  deletedProduct
} from "../controllers/clients.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.delete("/delete-customer/:id", deletedCustomer);
router.get("/transaction", getTransaction);
router.delete("/delete-transaction/:id", deleteTransaction);
router.delete("/delete-product/:id", deletedProduct);
router.get("/get-geography", getGeography);
export default router;
