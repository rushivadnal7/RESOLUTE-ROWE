import productModel from "../Models/productModel.js";
import { v2 as cloudinary } from 'cloudinary'

const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            market_rate,
            sizes,
            colors,
        } = req.body;

        const frontImage = req.files.frontImage && req.files.frontImage[0];
        const backImage = req.files.backImage && req.files.backImage[0];
        const thirdImage = req.files.thirdImage && req.files.thirdImage[0];
        const fourthImage = req.files.fourthImage && req.files.fourthImage[0];

        const images = [frontImage, backImage, thirdImage, fourthImage].filter(
            (item) => item !== undefined
        );

        let imageUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, {
                    resource_type: 'image',
                })
                return result.secure_url;   
            })
        )

        const productData = {
            name,
            description,
            price: Number(price),
            market_rate: Number(market_rate),
            sizes: JSON.parse(sizes),
            colors: JSON.parse(colors),
            images: imageUrl,
            date: Date.now().toString(),
        }

        const product = new productModel(productData)
        await product.save()

        return res.json({ success: true, message: 'product added' })
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

// get all products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        return res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};


const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        return res.json({ success: true, message: "Product removed" });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};


//single product
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        return res.json({ success: true, product });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

export { addProduct, listProducts, removeProduct, singleProduct };