import userModel from "../Models/userModel.js";

//add product to cart
const addToCart = async (req, res) => {
    try {
        const { itemId, size, quantity } = req.body;
        const userId = req.userId;
        const userData = await userModel.findById(userId);
        if (!userData)
            return res.json({ success: false, message: "User not found" }); 

        let cartData = await userData.cartData;
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += quantity; 
            } else {    
                cartData[itemId][size] = quantity;  
            }
        } else {
            cartData[itemId] = {}; 
            cartData[itemId][size] = quantity;
        }
        await userModel.findByIdAndUpdate(userId, { cartData });
        return res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

//update product to cart
const updateCart = async (req, res) => {
    try {
        const { itemId, size, quantity } = req.body;
        const userId = req.userId; // Extracted from cookie middleware
        console.log(`itemId: ${itemId}, size: ${size}, quantity: ${quantity}, userId: ${userId}`);

        // Find user data
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        // Handle removal when quantity is 0
        if (quantity === 0) {
            if (cartData[itemId] && cartData[itemId][size]) {
                // Remove the specific size
                delete cartData[itemId][size];

                // If no sizes remain, remove the product completely
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            }
        } else {
            // Update the quantity
            if (!cartData[itemId]) {
                cartData[itemId] = {}; // Initialize the item if not present
            }
            cartData[itemId][size] = quantity;
        }

        // Save the updated cartData
        await userModel.findByIdAndUpdate(userId, { cartData });

        return res.json({ success: true, message: "Cart updated successfully" });
    } catch (error) {
        console.error("Error in updateCart:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


//get product from cart
const getUserCart = async (req, res) => {
    try {
        const userId = req.userId;  
        console.log(userId)
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        let cartData = await userData.cartData;
        return res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

const calculateCartTotal = async (req,res) => {
    try{
        const {cartData} = req.body
        console.log(cartData)
        return res.json({success : true , message : 'calculated successfully'})
    }catch(error){
        console.log(error)
        return res.json({success : false , message : 'error in calculating total'})
    }
}

const localStrgToDB = async (req,res) => {
    try{
        const {cartData} = req.body
        const userId = req.userId;
        console.log(cartData)
        await userModel.findByIdAndUpdate(userId, { cartData });
        return res.json({success : true , message : 'successfully stored cart'})
    }catch(error){
        console.log(error)
        return res.json({success : false , message : 'error storing data'})
    }
}

export { addToCart, updateCart, getUserCart , calculateCartTotal , localStrgToDB };