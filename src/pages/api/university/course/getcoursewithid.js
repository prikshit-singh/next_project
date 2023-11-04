// import Jwt from 'jsonwebtoken';
// import varifyuser from '../../../../components/backendmodules/varifyuser'
import varifyuser from '../../../../components/backendmodules/varifyuser.js'
import University from '../../models/universitymodels/university.js';
import State from '../../models/universitymodels/state.js'
import City from '../../models/universitymodels/city.js'
import Course from '../../models/universitymodels/course.js'
import Subject from '../../models/universitymodels/subject.js'
import { connectDB } from '../../../api/users/dbconfig/dbconfig'

export default async function handler(req, res) {
    try {
        await connectDB()
        console.log('hello id')
        // await State.find({})
        // await City.find({})
        // await Course.find({})
        await Subject.find({})
        const course = await Course.find({_id:req.headers.id}).populate({
            path: 'subject',
            options: { sort: { title: 1 } } // Sort courses by the 'name' field in ascending order
          })
        const university = await University.find({_id:req.headers.uid})
        console.log(course,university)
        if (university && course) {
            res.status(200).send({ CODE: 200, result: {university,course} });
        } else {
            res.status(200).send({ CODE: 405, result: {university,course} });
        }

    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 401, message: error })

    }
};