
import varifyuser from '../../../../components/backendmodules/varifyuser.js'
import Signup from '../../models/signup.js'

import { connectDB } from '../../../api/users/dbconfig/dbconfig'

export default async function handler(req, res) {
    try {
        await connectDB()
        
            const roles = await Signup.find({})
            if (roles) {
                res.status(200).send({ CODE: 200,result: roles });
            } else {
                res.status(200).send({ CODE: 405, result:roles });
            }
        
    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 401, message: error })

    }
};