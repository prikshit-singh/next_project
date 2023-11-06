// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectDB } from '../../users/dbconfig/dbconfig'
import nodemailer from 'nodemailer';
import varifyuser from '../../../../components/backendmodules/varifyuser'
import Papers from '../../models/previousyearpaper';

export const config = {
  api: {
    responseLimit: '50mb',
  },
}
// const router = express.Router();
export default async function handler(req, res) {
  try {
    // const connection = await connect()
    if (req.method !== 'GET') {
      res.status(200).send({ CODE: 405, message: 'Only Get requests allowed' })
      return
    }
    connectDB()

    const user = await varifyuser(req.headers.token)

    if (user) {
      const papers = await Papers.find({}).populate('uploadby').populate('university').populate('course').populate('subject')
      if (papers) {
        return res.status(200).json({ CODE: 200, result: papers })
      }else{
        return res.status(200).json({ CODE: 503, message: "Please Login First" })
      }
    }else{
      return res.status(200).json({ CODE: 503, message: "Please Login First" })
    }

    
  } catch (error) {
    res.status(200).send({ CODE: 400, error: error })
  }

}

