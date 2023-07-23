// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import  {connectDB}  from '@/pages/api/users/dbconfig/dbconfig.js'
import Blog from '../models/blog';
export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.status(405).send({ message: 'Only POST requests allowed' })
      return
    }
    console.log(req.body.data)
    
    await connectDB()
    const blog =await new Blog({
      title: req.body.data.title,
      subtitle:req.body.data.subtitle,
      slug: req.body.data.slug,
      keywords:req.body.data.keywords,
      content: req.body.data.content,
      date:req.body.data.date,
    });
    const result = await blog.save()
    // console.log(result)
    return res.status(200).json({ name: result })
  } catch (error) {
    console.log(error)
  }

}

// export default router;
