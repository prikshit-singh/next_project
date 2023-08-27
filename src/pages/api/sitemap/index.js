// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectDB } from '@/pages/api/users/dbconfig/dbconfig.js'
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
            res.status(200).send({ CODE: 405, message: 'Only POST requests allowed' })
            return
        }
        await connectDB()

        const blog = await Blog.find({})

        if (blog) {
            let newSiteMap = await blog.map((data) => {
                let time = new Date().toLocaleDateString('es-pa');
                // let newTimeString = time.toLocaleDateString() + ' ' + time.toLocaleTimeString()
                let newTimeString = time.split('/').reverse().join('-')
                let slug1 = data.slug.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-') + '-' + `${data._id}`
                slug1 = `https://gitgurus.com/blog/${slug1}`
                return { url: slug1.replaceAll('--', '-'), createdDate: newTimeString };
            })
            return res.status(200).json({ CODE: 200, blog: newSiteMap })

        }
    } catch (error) {
        res.status(200).send({ CODE: 400, error: error })
    }

}

