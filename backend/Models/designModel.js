import mongoose from "mongoose";
import { Schema } from "mongoose";

const designSchema = new Schema({
    name: { type: String, required: true },
    image: { type: Array, required: true },
    price: { type: Number, required: true },
})

const designModel = mongoose.model.product || mongoose.model('designs', designSchema);

export default designModel;