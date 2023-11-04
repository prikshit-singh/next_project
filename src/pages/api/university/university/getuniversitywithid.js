// import Jwt from 'jsonwebtoken';
// import varifyuser from '../../../../components/backendmodules/varifyuser'
import varifyuser from '../../../../components/backendmodules/varifyuser.js'
import University from '../../models/universitymodels/university.js';
import State from '../../models/universitymodels/state.js'
import City from '../../models/universitymodels/city.js'
import Course from '../../models/universitymodels/course.js'
import { connectDB } from '../../../api/users/dbconfig/dbconfig'

export default async function handler(req, res) {
    try {
        await connectDB()
        console.log('hello id')
        // await State.find({})
        // await City.find({})
        // await Course.find({})
        const university = await University.find({_id:req.headers.id}).populate('state').populate('city').populate({
            path: 'course',
            options: { sort: { title: 1 } } // Sort courses by the 'name' field in ascending order
          })
        if (university) {
            res.status(200).send({ CODE: 200, result: university });
        } else {
            res.status(200).send({ CODE: 405, result: university });
        }

    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 401, message: error })

    }
};