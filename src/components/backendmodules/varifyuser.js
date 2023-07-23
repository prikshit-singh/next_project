import Jwt from 'jsonwebtoken';
import Signup from '../../pages/api/models/signup';
import  {connectDB}  from '@/pages/api/users/dbconfig/dbconfig'
export default async function handler (token){
    console.log(token)
    await connectDB()
   const veify= Jwt.verify(token, 'this key is private', async function (err, decoded) {
        if(err){
            console.log(err)
            if(err.name==='TokenExpiredError')
            return  false
        }
        console.log(decoded)
        const result = await Signup.findOne({ 'email': decoded.email, 'password': decoded.password })
        if (result) {
           return  {email:decoded.email,password:decoded.password}
        }else{
            return  false
        }
    });
    return veify
    // res.status(200).send(token)
}