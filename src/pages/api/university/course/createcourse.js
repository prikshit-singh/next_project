// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { connectDB } from '@/pages/api/users/dbconfig/dbconfig.js'
import { connectDB } from '../../users/dbconfig/dbconfig.js'
import Signup from '../../models/signup.js';
import varifyuser from '../../../../components/backendmodules/varifyuser.js'
import Course from '../../models/universitymodels/course.js';



export default async function handler(req, res) {

    try {
        await connectDB()
        let cookies =  req.headers.token
        if (cookies) {
            let userData = await varifyuser(cookies)
            if (userData) {
                const existingSubject = await Course.findOne({ title: req.body.title.toLowerCase() });
        
                if (existingSubject) {
                  return res.status(200).json({ CODE: 409, message: 'Title already exists' });
                }
                const Course1 = await new Course({
                    title: req.body.title.toLowerCase(),
                    coursecode:req.body.coursecode.toLowerCase(),
                    subject:req.body.subject,
                    duration:req.body.duration,
                    createdby: userData._id
                });
                const result = await Course1.save()
                return res.status(200).json({ CODE: 200, result: result })
            }}else{
             return res.status(200).json({ CODE: 503, message: 'Log In First' })
            }
    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 400, message: 'Something went wrong' })

    }


};

// export default router;
