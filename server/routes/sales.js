import express from 'express';
import {
 getSales
} from "../controllers/sales.js";

const router = express.Router();

router.get("/get-sale", getSales);

export default router;
