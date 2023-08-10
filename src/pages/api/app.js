// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import  {connectDB}  from '@/pages/api/users/dbconfig/dbconfig.js'
import Blog from './models/blog';

// const router = express.Router();
export default async function handler(req, res) {
  try {
    // const connection = await connect()
    if (req.method !== 'POST') {
      res.status(200).send({CODE:405, message: 'Only POST requests allowed' })
      return
    }

    await connectDB()
    console.log(req.body.data)
    const blog =await new Blog({
      title: 'prikshit',
      slug: req.body.data,
      content: req.body.data
    });
    const result = await blog.save()
    console.log(result)
    return res.status(200).json({CODE:200, name: req.body.data })
  } catch (error) {
    return res.status(200).json({CODE:400, error: error })

  }

}

// export default router;
