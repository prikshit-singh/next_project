// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectDB } from '../users/dbconfig/dbconfig.js'
import  Jwt  from 'jsonwebtoken';
import Signup from '../models/signup';

export default async function handler(req, res) {
const {email,password}= req.body
  try {
    await connectDB()
  const result =  await Signup.findOne({'email': req.body.email,'password':req.body.password})

  if(result){
    Jwt.sign({ email: result.email,password:result.password,_id:result._id }, 'this key is private',  function(err, token) {
      if(err){
        return res.status(200).json({CODE:400, message:'invalid credientials' })
      }else{
        res.status(200).json({CODE:200, result,token })
      }
    });
  }else{
    return res.status(200).json({CODE:400, message:'no user found' })

  }
  } catch (error) {
    return res.status(200).json({CODE:400,message:error })

  }


};

// export default router;
