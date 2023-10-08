// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectDB } from '../../users/dbconfig/dbconfig'
import Blog from '../../models/blog';
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
      res.status(200).send({ CODE: 405, message: 'Only Get requests allowed' })
      return
    }
    await connectDB()
    const { id } = await req.query

    const blog = await Blog.findOne({ _id: id }).populate('writtenby')
    if (blog) {
      // let newTimeString = time.toLocaleDateString() + ' ' + time.toLocaleTimeString()
      let slug1 =await blog.slug.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-') + '-' + `${blog._id}`
      slug1 = `https://gitgurus.com/blog/${slug1}`
      slug1= slug1.replaceAll('--','-')

      return res.status(200).json({ CODE: 200, blog: blog,url:slug1 })

    }
  } catch (error) {
    res.status(200).send({ CODE: 400, error: error })

  }

}



// export default router;
