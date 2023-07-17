// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import  {connectDB}  from '@/pages/api/users/dbconfig/dbconfig.js'
import Signup from '../../models/signup';

// const router = express.Router();
export default async function handler(req, res) {
  try {
    // const connection = await connect()
    if (req.method !== 'POST') {
      res.status(405).send({ message: 'Only POST requests allowed' })
      return
    }

    await connectDB()
    console.log(req.body.data)
    const signup =await new Signup({
      name: 'prikshit',
      lastname: req.body.data,
      phone: req.body.data,
      email: req.body.data,
      password: req.body.data,
      date: req.body.data,
    });
    const result = await signup.save()
    console.log(result)
    return res.status(200).json({ result: result })
  } catch (error) {
    console.log(error)
  }

}