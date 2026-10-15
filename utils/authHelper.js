import bcrypt from "bcrypt"
import validator from "validator"
import { userSchema } from "../models/userModels.js"

export const isExsistingUser = async(email)=>{
    console.log(`Email Received In Utils`)
    const found = await userSchema.findOne({email})
    if(!found){
        console.log(`${email} Did'nt found`)
        return null
    }
    console.log(`${email} Found`)
    return found
}

export const isMail = (email)=>{
    const mail =  validator.isEmail(email)
    return mail
}

export const GenPass = async(password)=>{
    const salt = await bcrypt.genSalt(10)
    const pass  = await bcrypt.hash(password, salt)
    return pass
}