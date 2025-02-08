import express from "express";
import { createOrder, trackOrder } from "../Controllers/delhiveryController.js";


const router = express.Router();

router.post("/create-order", createOrder);
router.get("/track-order/:waybill", trackOrder);

export default router;
