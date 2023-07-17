import Jwt from 'jsonwebtoken';
import Signup from '../models/signup';
import  {connectDB}  from '@/pages/api/users/dbconfig/dbconfig.js'
export const varifytoken = async (req, res) => {
    console.log(req.headers.token)
    await connectDB()
   const veify=await Jwt.verify(req.headers.token, 'this key is private', async function (err, decoded) {
        const result = await Signup.findOne({ 'email': decoded.email, 'password': decoded.password })
        if (result) {
            return true
        }else{
            return false
        }
    });
    return veify
}