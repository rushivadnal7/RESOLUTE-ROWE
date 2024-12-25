import { v2 as cloudinary } from 'cloudinary'
import designModel from '../Models/designModel.js'

export const addDesign = async (req, res) => {
    try {
        const {
            name,
            price
        } = req.body;

        const designImage = req.files.image?.[0];

        const result = await cloudinary.uploader.upload(designImage.path, {
            resource_type: 'image',
        })

        const designData = {
            name,
            price,
            image: result.secure_url
        }
        
        const design = new designModel(designData)
        design.save()
        
        return res.json({ success: true, message: 'design added!' })

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

export const listDesigns = async (req, res) => {
    try {
        const designs = await designModel.find({})
        return res.json({ success: true, designs })
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

export const removeDesign = async (req, res) => {
    try {
        await designModel.findByIdAndDelete(req.body.id);
        return res.json({ success: true, message: "Product removed" });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};