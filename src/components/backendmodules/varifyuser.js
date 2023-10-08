import Jwt from 'jsonwebtoken';
import Signup from '../../pages/api/models/signup';
import  {connectDB}  from '../../pages/api/users/dbconfig/dbconfig'


export default async function handler (token){
    
    await connectDB()
    // let token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByaUBnbWFpbC5jb20iLCJpZCI6IjY0ZGZjYWU3ODQwYmExZWM1NGQ1YTAzMSIsImlhdCI6MTY5MzMzODU2Nn0.rVanxQe0rJVh0OtJmgXTfro7npSUyfE5Iwpc1bkxP20"

   const veify= Jwt.verify(token, 'this key is private', async function (err, decoded) {
        if(err){
            // console.log(err)
            // if(err.name==='TokenExpiredError')
            return  {CODE:401,msg:'token invalid'}
        }
        const result = await Signup.findOne({ 'email': decoded.email, '_id': decoded._id })
        if (result) {
           return  {CODE:200,email:decoded.email,_id:decoded._id}
        }else{
            return  {CODE:401,email:decoded.email}
        }
    });
    return veify
    // res.status(200).send(token)
}