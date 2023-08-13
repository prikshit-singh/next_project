import Jwt from 'jsonwebtoken';
import varifyuser from '@/components/backendmodules/varifyuser'
import Blog from '../../models/blog';
import Signup from '@/pages/signup';
// import Signup from '../models/signup';
import { connectDB } from '@/pages/api/users/dbconfig/dbconfig.js'

export default async function handler(req, res) {
    try {
        await connectDB()
            const blog = await Blog.findById({ _id: req.headers.blogid }).populate('Comments.commentedBy')
            console.log(blog)
            if (blog) {
                res.status(200).send({ CODE: 200, blog });
            } else {
                res.status(200).send({ CODE: 405, blog });
            }
        
    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 401, message: error })

    }
};