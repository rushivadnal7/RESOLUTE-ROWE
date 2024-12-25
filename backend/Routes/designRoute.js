import express from 'express'
import upload from '../Middleware/Multer.js';
import { addDesign , removeDesign ,listDesigns } from '../Controllers/designController.js';

const designRouter = express.Router();

designRouter.post(
    "/add",
    upload.fields([
        { name: "image", maxCount: 1 }
    ]),
    addDesign
);

designRouter.post("/remove", removeDesign);
designRouter.get("/list", listDesigns);

export default designRouter