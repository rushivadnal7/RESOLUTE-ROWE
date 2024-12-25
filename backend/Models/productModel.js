import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema = new Schema({
    name: { type: String, required: true },
    images: { type: Array, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    market_rate: { type: Number, required: false },
    sizes: { type: Array, required: true },
    colors: { type: Array, required: true },
    date: { type: Number, required: true },
})

const productModel = mongoose.model.product || mongoose.model('product' , productSchema);

export default productModel;

