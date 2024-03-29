import { connectDB } from '../../../api/users/dbconfig/dbconfig.js'
import Jwt from 'jsonwebtoken';
import varifyuser from '../../../../components/backendmodules/varifyuser.js'
import Blog from '../../models/blog';
// import Signup from '../models/signup';

export default async function handler(req, res) {
  try {
    await connectDB()
    let token = req.headers.token
    if (token) {
      // token= token.split('token=')[1]
      let userData = await varifyuser(token)
      console.log('request', userData)

      if (userData) {
        let findBlog = await Blog.findById({ _id: req.headers.blogid })
        let userExist = await findBlog.LikedBy.filter((data) => data.toString() === userData._id)
        if (userExist.length === 0) {
          const blog = await Blog.findOneAndUpdate({ _id: req.headers.blogid }, { $push: { LikedBy: userData._id } }, { new: true })
          if (blog) {
            res.status(200).send({ CODE: 200, blog });
          } else {
            res.status(200).send({ CODE: 405, blog });
          }
        } else {
          const blog = await Blog.findOneAndUpdate({ _id: req.headers.blogid }, { $pull: { LikedBy: userData._id } }, { new: true })
          if (blog) {
            res.status(200).send({ CODE: 200, blog });
          } else {
            res.status(200).send({ CODE: 405, blog });
          }
        }
      } else {
        res.status(200).send({ CODE: 301, msg: 'please login first' })
      }
    } else {
      res.status(200).send({ CODE: 301, msg: 'please login first' })
    }
  } catch (error) {
    return res.status(200).json({ CODE: 401, message: error })

  }
};