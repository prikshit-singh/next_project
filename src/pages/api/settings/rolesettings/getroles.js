// import Jwt from 'jsonwebtoken';
// import varifyuser from '../../../../components/backendmodules/varifyuser'
import varifyuser from '../../../../components/backendmodules/varifyuser.js'
import Roles from '../../models/settings/roles/roles.js'
// import Signup from '@/pages/signup';
// import Signup from '../../../signup/index'
// import Signup from '../models/signup';
import { connectDB } from '../../../api/users/dbconfig/dbconfig'

export default async function handler(req, res) {
    try {
        await connectDB()
            const roles = await Roles.find({}).populate('canaccessmenus').populate('canaccessprofilemenus').populate('canaccess')
            if (roles) {
                res.status(200).send({ CODE: 200, roles });
            } else {
                res.status(200).send({ CODE: 405, roles });
            }
        
    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 401, message: error })

    }
};