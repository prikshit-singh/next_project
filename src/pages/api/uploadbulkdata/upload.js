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

        // for (const stateData of states) {
        //     // const results = [];
        //     // for (let i = 0; i < stateData.subject.length; i++) {
        //     //     const subjectId = await Subject.find({ title: stateData.subject[i].toLowerCase() }, '_id')

        //     //     results.push(subjectId[0]._id.toString())
        //     // }
        //     // console.log({
        //     //     title: stateData.title,
        //     //     subjectCode: stateData.subjectCode,
        //     //     duration: stateData.duration,
        //     //     subject: results
        //     // })
        //     // results1.push({
        //     //     title: stateData.title.toLowerCase(),
        //     //     subjectCode: stateData.subjectCode.toLowerCase(),
        //     //     duration: stateData.duration,
        //     //     subject: results
        //     // })


        //     // results1.push(extractedIds)
        //     const state = new Course({
        //         title: stateData.title.toLowerCase(),
        //         coursecode:stateData.subjectCode.toLowerCase(),
        //         subject:stateData.subject,
        //         duration:stateData.duration,
        //         createdby: '651a8949d2b3e42f71c18de0',
        //     });

        //     const result = await state.save();
        //     results.push(result);
        // }

        // const state1 = await new State({
        //     title: req.body.title.toLowerCase(),
        //     statecode:req.body.statecode.toLowerCase(),
        //     createdby: userData._id
        // });
        // const result = await state1.save()
        return res.status(200).json({ CODE: 200, result: req })

    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 400, message: error })

    }


};

// export default router;
