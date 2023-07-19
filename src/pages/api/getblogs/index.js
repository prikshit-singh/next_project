// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import  {connectDB}  from '@/pages/api/users/dbconfig/dbconfig.js'
import Blog from '../models/blog';
export const config = {
  api: {
    responseLimit: false,
  },
}
// const router = express.Router();
export default async function handler(req, res) {
  try {
    // const connection = await connect()
    if (req.method !== 'GET') {
      res.status(405).send({ message: 'Only POST requests allowed' })
      return
    }

    await connectDB()
    const blog =await Blog.find({})
    return res.status(200).json({ blog: blog })
  } catch (error) {
    console.log(error)
  }

}

// export default router;
