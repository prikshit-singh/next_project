// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import  {connectDB}  from '@/pages/api/users/dbconfig/dbconfig.js'
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
      res.status(405).send({ message: 'Only GET requests allowed' })
      return
    }
    await connectDB()
    const blog = await Blog.find({})
      console.log(11111,blog)
      if(blog){
        return res.status(200).json({ blog: blog })

      }
  } catch (error) {
    console.log(error)
  }

}

