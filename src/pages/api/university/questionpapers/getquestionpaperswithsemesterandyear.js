// import Jwt from 'jsonwebtoken';
// import varifyuser from '../../../../components/backendmodules/varifyuser'
import varifyuser from '../../../../components/backendmodules/varifyuser.js'
import State from '../../models/universitymodels/state.js';
import University from '../../models/universitymodels/university.js';
import Course from '../../models/universitymodels/course.js';
import Subject from '../../models/universitymodels/subject.js';
import Previousyearpaper from '../../models/previousyearpaper.js'

import { connectDB } from '../../users/dbconfig/dbconfig.js'

export default async function handler(req, res) {
    try {
        await connectDB()
        const university =await University.find({ _id: req.headers.uid })
        const course =await Course.find({ _id: req.headers.cid })
        const subject =await Subject.find({ _id: req.headers.id })
        const papers = await Previousyearpaper.find({ subject: req.headers.id, course: req.headers.cid, university: req.headers.uid,year:req.headers.year,semester:req.headers.semester }).populate({
            path: 'course',
            options: { sort: { title: 1 } } // Sort courses by the 'name' field in ascending order
          }).populate({
            path: 'subject',
            options: { sort: { title: 1 } } // Sort courses by the 'name' field in ascending order
          })
        if (papers) {
            res.status(200).send({ CODE: 200, result: {papers,university,course,subject} });
        } else {
            res.status(200).send({ CODE: 405, result: papers });
        }

    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 401, message: error })

    }
};