// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectDB } from '@/pages/api/users/dbconfig/dbconfig.js'
import  Jwt  from 'jsonwebtoken';
import Signup from '../models/signup';
import path from 'path';
import fs from 'fs'
import { IncomingForm } from 'formidable';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { json } from 'body-parser';
// import { varifytoken } from '../varifytoken';

// console.log(varifytoken())
export default async function handler(req, res) {
console.log(req.body.email)
const {email,password}= req.body
console.log(email,password)
  try {
    await connectDB()
  const result =  await Signup.findOne({'email': req.body.email,'password':req.body.password})
  if(result){
    Jwt.sign({ email: result.email,password:result.password }, 'this key is private', { expiresIn: '10d' }, function(err, token) {
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
    return res.status(400).json({CODE:400,message:error })

  }


};

// export default router;
