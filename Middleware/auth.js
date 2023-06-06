const jwt = require("jsonwebtoken")
const {UserModel} = require("../Model/UserModel")
require("dotenv").config()
const authMiddleware  = async(req,res,next)=>{
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token,process.env.Secret);
        const {userId} = decodedToken;
        const user = await UserModel.findById(userId);
        if(!user){
            return res.status(401).json({message:"Unauthorized"})
        }
        req.user = user;
        next()
    } catch (error) {
        return res.status(401).json({message:error.message})
    }
}
module.exports = {authMiddleware}