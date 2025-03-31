import express from "express";
import { sendEmail } from "../Controllers/contactController.js";
// import { sendEmail } from "../controllers/contactController.js";


const contactRouter = express.Router();

contactRouter.post("/send-email", sendEmail);

export default contactRouter;
