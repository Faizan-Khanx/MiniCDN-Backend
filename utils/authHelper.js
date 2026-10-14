import bcrypt from "bcrypt"
import { userSchema } from "../models/userModels"
import { isPassportNumber } from "validator"

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

export const GenPass = async(password)=>{
    const salt = bcrypt.genSalt(10)
    const pass  = bcrypt.hash(password, salt)
    console.log(`Password generated: ${isPassportNumber}`)
    return pass
}