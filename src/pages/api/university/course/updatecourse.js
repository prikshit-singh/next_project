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

                const update = {
                    title: req.body.title.toLowerCase(),
                    coursecode:req.body.coursecode.toLowerCase(),
                    subject:req.body.subject,
                    duration:req.body.duration,
                };

                // Find and update the City document
                const Course1 = await Course.findOneAndUpdate(
                    { _id: req.body.ID },
                    update,
                    { new: true } // To return the updated document
                );
                if (Course1) {
                    return res.status(200).json({ CODE: 200, result: Course1 })

                } else {
                    return res.status(200).json({ CODE: 503, result: 'Log In First' })
                }
                
            }}else{
             return res.status(200).json({ CODE: 503, result: 'Log In First' })
            }
    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 400, message: error })

    }


};

// export default router;
