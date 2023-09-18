// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectDB } from '../users/dbconfig/dbconfig'
import nodemailer from 'nodemailer'
import Papers from '../models/previousyearpaper';

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
      res.status(200).send({ CODE: 405, message: 'Only POST requests allowed' })
      return
    }
    await connectDB()

   
    
    const papers = await Papers.find({}).populate('uploadby')
    if (papers) {
     
      return res.status(200).json({ CODE: 200, papers: papers })

    }
  } catch (error) {
    res.status(200).send({ CODE: 400, error: error })
  }

}

