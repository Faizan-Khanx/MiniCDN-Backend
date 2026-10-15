import { isMail } from "../utils/authHelper.js"
const RegisterMiddleware = async (req, res, next)=>{
    const {email, password} = req.body
    if(!email || !password){
        console.log(`Email and Password is required`)
        return res.status(401).json({message:"Email and Password Is Required"})
    } 
    if(!isMail(email)){
        console.log(`Invalid Email Address`)
        return res.status(404).json("Invalid Email Address must include @ or '.' ")
    }
    next()

}

export {RegisterMiddleware}