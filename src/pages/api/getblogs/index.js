// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import  {connectDB}  from '@/pages/api/users/dbconfig/dbconfig.js'
import nodemailer from 'nodemailer'

import Blog from '../models/blog';
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
      res.status(200).send({CODE:405, message: 'Only POST requests allowed' })
      return
    }
    await connectDB()

    let testAccount = await nodemailer.createTestAccount()
    const transporter = nodemailer.createTransport({
      // 465 or 25
      host: 'mail.gitgurus.com',
      port: 587,
      auth: {
        // user: 'gregoria.weissnat@ethereal.email',
        user: 'support@gitgurus.com',
        pass: 'support@gitgurus'
      }
  });
    
    const mailOptions = {
      from: ' "Prikshit Singh" <support@gitgurus>',
      to: 'prikshitlatherlather@gmail.com',
      subject: 'Invoices due',
      text: 'Dudes, we really need your money.'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
      console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    const blog = await Blog.find({})
      if(blog){
        return res.status(200).json({CODE:200, blog: blog })

      }
  } catch (error) {
    res.status(200).send({CODE:400, error: error })
  }

}

