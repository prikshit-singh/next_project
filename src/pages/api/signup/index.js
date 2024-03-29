// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { connectDB } from '@/pages/api/users/dbconfig/dbconfig.js'
import { connectDB } from '../users/dbconfig/dbconfig.js'
import Signup from '../models/signup';

import path from 'path';
import fs from 'fs'
import { IncomingForm } from 'formidable';
import { join } from 'path';
import { readFile } from 'fs/promises';




export default async function handler(req, res) {

  try {
    await connectDB()
    console.log(typeof(parseInt(req.body.phone)))


    


    const signup = await new Signup({
      name: req.body.name,
      lastname:'',
      userName:`${Date.now()}`,
      userImage:req.body.email,
      profession:'',
      phone: 123456789,
      email: req.body.email,
      password: '1234',
      roles:[],
      isvarify:'false',
      isvarifiedWriter:'',
      bio:'',
      usermeta:[],
      date: Date.now(),
      });
      const result = await signup.save()
      return res.status(200).json({CODE:200, result:req.body })
  } catch (error) {
    console.log(error)
    return res.status(200).json({CODE:400,message:error })

  }


};

// export default router;
