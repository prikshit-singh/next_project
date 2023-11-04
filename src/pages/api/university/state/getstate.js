// import Jwt from 'jsonwebtoken';
// import varifyuser from '../../../../components/backendmodules/varifyuser'
import varifyuser from '../../../../components/backendmodules/varifyuser.js'
import State from '../../models/universitymodels/state.js';
// import Signup from '@/pages/signup';
// import Signup from '../../../signup/index'
// import Signup from '../models/signup';
import { connectDB } from '../../../api/users/dbconfig/dbconfig'

export default async function handler(req, res) {
    try {
        await connectDB()
            const state = await State.find({}).populate('createdby').sort({ title: 1 })
            if (state) {
                res.status(200).send({ CODE: 200, result:state });
            } else {
                res.status(200).send({ CODE: 405, result:state });
            }
        
    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 401, message: error })

    }
};