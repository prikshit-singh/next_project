// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectDB } from '@/pages/api/users/dbconfig/dbconfig.js'
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
    // console.log(req)
    await connectDB()
    // console.log(req.body.id)
    const { id } = await req.query
    // console.log('id',id)

    const blog = await Blog.findOne({ _id: id }).populate('writtenby')
    if (blog) {
      // let newTimeString = time.toLocaleDateString() + ' ' + time.toLocaleTimeString()
      let slug1 =await blog.slug.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-') + '-' + `${blog._id}`
      slug1 = `https://gitgurus.com/blog/${slug1}`
      slug1= slug1.replaceAll('--','-')
      // console.log('blog', slug1)

      return res.status(200).json({ CODE: 200, blog: blog,url:slug1 })

    }
  } catch (error) {
    res.status(200).send({ CODE: 400, error: error })

  }

}



// export default router;
