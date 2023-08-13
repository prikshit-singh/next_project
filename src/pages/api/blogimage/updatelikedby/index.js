import { connectDB } from '@/pages/api/users/dbconfig/dbconfig.js'
import  Jwt  from 'jsonwebtoken';
import varifyuser from '@/components/backendmodules/varifyuser'
import Blog from '../../models/blog';
// import Signup from '../models/signup';

export default async function handler(req, res) {
    console.log(req.headers)
    let cookies = req.headers.cookie
    let token=''
    if(cookies){
        token= cookies.split('token=')[1]
        let userData = await varifyuser(token)
        console.log(userData)
        if(userData){
          const blog = await Blog.findOneAndUpdate({_id:req.headers.blogid},{ $push: { LikedBy: userData._id } },{ new: true })
          console.log(blog)
          res.status(200).send({blog})

        }
        // res.status(200).send({userData})

    }
// const {email,password,token}= req.body
// console.log(email,password)
//   try {
//     await connectDB()
//   const result =  await Signup.findOne({'email': req.body.email,'password':req.body.password})

//   if(result){
//     Jwt.sign({ email: result.email,password:result.password,_id:result._id }, 'this key is private',  function(err, token) {
//       if(err){
//         return res.status(200).json({CODE:400, message:'invalid credientials' })
//       }else{
//         res.status(200).json({CODE:200, result,token })
//       }
//     });
//   }else{
//     return res.status(200).json({CODE:400, message:'no user found' })

//   }
//   } catch (error) {
//     return res.status(200).json({CODE:400,message:error })

//   }



};