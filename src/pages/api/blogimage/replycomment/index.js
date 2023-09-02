import { connectDB } from '../../users/dbconfig/dbconfig'
import Jwt from 'jsonwebtoken';
import varifyuser from '../../../../components/backendmodules/varifyuser'
import Blog from '../../models/blog';
// import Signup from '../models/signup';

export default async function handler(req, res) {
    try {
        await connectDB()
        let cookies =  req.headers.token
        let token = ''
        const newCommentReply = {
            commentText: 'New reply text',
            commentedBy: 'user_id', // The ID of the user adding the reply
            commentDate: '2023-08-19', // The date of the reply
        };
        if (cookies) {
            let userData = await varifyuser(cookies)
            if (userData) {
                const blog = await Blog.findOneAndUpdate({ _id: req.headers.blogid, 'Comments._id': req.headers.commentid }, {
                    $push: {
                        'Comments.$.commentreplies': {
                            commentText: req.body.commentText,
                            commentedBy: userData._id,
                            commentDate: req.body.commentDate
                        },
                    },
                },
                    { new: true },)

                if (blog) {
                    res.status(200).send({ CODE: 200, blog });
                } else {
                    res.status(200).send({ CODE: 405, blog });
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