// import Jwt from 'jsonwebtoken';
// import varifyuser from '../../../../components/backendmodules/varifyuser'
import varifyuser from '../../../../components/backendmodules/varifyuser.js'
import University from '../../models/universitymodels/university.js';
import State from '../../models/universitymodels/state.js'
import City from '../../models/universitymodels/city.js';
import Course from '../../models/universitymodels/course.js'
import { connectDB } from '../../../api/users/dbconfig/dbconfig'

export default async function handler(req, res) {
    try {
        await connectDB()
       const StateData= await State.find({})
       const CityData= await City.find({})
       const CourseData= await Course.find({})
        if (StateData && CityData && CourseData ) {
            res.status(200).send({ CODE: 200, result: {CourseData,CityData,StateData} });
        } else {
            res.status(200).send({ CODE: 405, result: {} });
        }

    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 401, message: error })

    }
};