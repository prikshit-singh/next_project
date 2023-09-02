import Jwt from 'jsonwebtoken';
import Signup from '../models/signup';
import  {connectDB}  from '../users/dbconfig/dbconfig'
export default async function handler (req, res){
    console.log(req.body.token)
    await connectDB()
   const veify= Jwt.verify(req.body.token, 'this key is private', async function (err, decoded) {
        if(err){
            console.log(err)
            if(err.name==='TokenExpiredError')
            return  res.status(401).send({err})
        }
        console.log('decoded',decoded)
        const result = await Signup.findOne({ 'email': decoded.email,'_id':decoded._id })
        if (result) {
           return  res.status(200).send({CODE:200,message:'success'})
        }else{
            return  res.status(200).send({CODE:400,message:'failed'})
        }
    });
    return veify
    // res.status(200).send(req.body.token)
}