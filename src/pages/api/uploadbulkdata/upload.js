// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { connectDB } from '@/pages/api/users/dbconfig/dbconfig.js'
import { connectDB } from '../users/dbconfig/dbconfig.js'
import Signup from '../models/signup.js';
import varifyuser from '../../../components/backendmodules/varifyuser.js'
import Subject from '../models/universitymodels/subject.js';
import State from '../models/universitymodels/state.js';
import City from '../models/universitymodels/city.js'
import Course from '../models/universitymodels/course.js'

export default async function handler(req, res) {

    try {
        await connectDB()
        const results = [];

       const data =  await Subject.updateMany({}, { $set: { createdby: '652859378995bc1199080ad0' } });
       return res.status(200).json({ CODE: 200, data })

    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 400, message: error })

    }


};

// export default router;
