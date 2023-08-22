import { connectDB } from '@/pages/api/users/dbconfig/dbconfig.js'
import Jwt from 'jsonwebtoken';
import varifyuser from '@/components/backendmodules/varifyuser'
import Blog from '../../models/blog';
// import Signup from '../models/signup';

export default async function handler(req, res) {
    try {
        await connectDB()
        let cookies =  req.headers.token
        if (cookies) {
            let userData = await varifyuser(cookies)
            if (userData) {
                const blog = await Blog.findOneAndUpdate({ _id: req.headers.blogid }, {
                    $push: {
                        Comments: {
                            commentText: req.body.commentText,
                            commentedBy: userData._id,
                            commentDate: req.body.commentDate,
                            commentreplies:[]
                        }
                    }
                }, { new: true }).populate('Comments.commentedBy')
                if (blog) {
                    res.status(200).send({ CODE: 200, blog });
                } else {
                    res.status(200).send({ CODE: 301, msg: 'please login first' })
                }

            } else {
                res.status(200).send({ CODE: 301, msg: 'please login first' })
            }
        }else{
            res.status(200).send({ CODE: 301, msg: 'please login first' })
        }
    } catch (error) {
        return res.status(200).json({ CODE: 401, message: error })

    }
};