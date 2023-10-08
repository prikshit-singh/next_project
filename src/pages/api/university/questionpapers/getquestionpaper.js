// import Jwt from 'jsonwebtoken';
// import varifyuser from '../../../../components/backendmodules/varifyuser'
import varifyuser from '../../../../components/backendmodules/varifyuser.js'
import State from '../../models/universitymodels/state.js';
import University from '../../models/universitymodels/university.js';
import Course from '../../models/universitymodels/course.js';
import Subject from '../../models/universitymodels/subject.js';
// import Signup from '@/pages/signup';
// import Signup from '../../../signup/index'
// import Signup from '../models/signup';
import { connectDB } from '../../../api/users/dbconfig/dbconfig'

export default async function handler(req, res) {
    try {
        await connectDB()
        const university = await University.find({title:'kurukshetra university'})
        const course = await Course.find({title:'bachelor of computer applications'})
        const subject = await Subject.find({title:'hindi'})
        
            if (university) {
                res.status(200).send({ CODE: 200, university,course,subject });
            } else {
                res.status(200).send({ CODE: 405, university });
            }
        
    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 401, message: error })

    }
};