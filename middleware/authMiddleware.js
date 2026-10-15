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

const LoginMiddleware = async(req, res, next)=>{
    const {email, password} = req.body
    console.log(`Email And Password Received In Login Middleware`)
    if(!email || !password){
        console.log(`Email and Password is required in login middleware: ${email}:${password}`)
        return res.status(401).json({message:"Email and Password is required"})
    }
    if(!isMail(email)){
        console.log(`Invalid email address in login middleware: ${email}`)
        return res.status(404).json({message:"Invalid Email Address must include @ or '.'"})
    }
    next()
}

export {RegisterMiddleware, LoginMiddleware}