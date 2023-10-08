
import varifyuser from '../../../../components/backendmodules/varifyuser.js'
import Course from '../../models/universitymodels/course.js';
import { connectDB } from '../../users/dbconfig/dbconfig.js'

export default async function handler(req, res) {
    try {
        await connectDB()
            const course = await Course.find({}).populate('createdby').populate('subject')
            if (course) {
                res.status(200).send({ CODE: 200, course });
            } else {
                res.status(200).send({ CODE: 405, course });
            }
        
    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 401, message: error })

    }
};