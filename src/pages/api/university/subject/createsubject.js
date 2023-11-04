// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { connectDB } from '@/pages/api/users/dbconfig/dbconfig.js'
import { connectDB } from '../../users/dbconfig/dbconfig.js'
import Signup from '../../models/signup.js';
import varifyuser from '../../../../components/backendmodules/varifyuser.js'
import Subject from '../../models/universitymodels/subject.js';



export default async function handler(req, res) {

    try {
        await connectDB()
        let cookies =  req.headers.token
        if (cookies) {
            let userData = await varifyuser(cookies)
            if (userData) {
                const titleToInsert = req.body.title.toLowerCase();

                // Check if a document with the same title already exists
                const existingSubject = await Subject.findOne({ title: titleToInsert });
        
                if (existingSubject) {
                  return res.status(200).json({ CODE: 409, message: 'Title already exists' });
                }

                const Subject1 = await new Subject({
                    title: req.body.title.toLowerCase(),
                    createdby: userData._id
                });
                const result = await Subject1.save()
                return res.status(200).json({ CODE: 200, result: result })
            }}else{
             return res.status(200).json({ CODE: 503, message: 'Log In First' })
            }
    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 400, message: 'Something went srong' })

    }


};

// export default router;
