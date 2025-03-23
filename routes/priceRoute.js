import express from "express";
import {
    getAllPrices,
    addPrice,
    deletePrice
} from "../controllers/priceContoller.js";
const Pricerouter = express.Router();

Pricerouter.get("/prices", getAllPrices);
Pricerouter.post("/prices", addPrice);
Pricerouter.delete("/prices/:id", deletePrice);

export default Pricerouter;
