import express from 'express'
import { addProduct, listProducts, removeProduct, singleProduct } from "../Controllers/ProductController.js";
import upload from '../Middleware/Multer.js';


const productRouter = express.Router();

productRouter.post(
    "/add",
    upload.fields([
        { name: "frontImage", maxCount: 1 },    
        { name: "backImage", maxCount: 1 },
        { name: "thirdImage", maxCount: 1 },
        { name: "fourthImage", maxCount: 1 },
    ]),
    addProduct
);
productRouter.post("/remove", removeProduct);
productRouter.get("/list", listProducts);
productRouter.post("/single", singleProduct);

export default productRouter;