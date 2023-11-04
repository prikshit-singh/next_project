// import Jwt from 'jsonwebtoken';
// import varifyuser from '../../../../components/backendmodules/varifyuser'
import varifyuser from '../../../../components/backendmodules/varifyuser.js'
import City from '../../models/universitymodels/city.js'
// import Signup from '@/pages/signup';
// import Signup from '../../../signup/index'
// import Signup from '../models/signup';
import { connectDB } from '../../../api/users/dbconfig/dbconfig'

export default async function handler(req, res) {
    try {
        await connectDB()
            const city = await City.find({}).populate('state').sort({ title: 1 })
            if (city) {
                res.status(200).send({ CODE: 200, result:city });
            } else {
                res.status(200).send({ CODE: 405, result:city });
            }
        
    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 401, message: error })

    }
};