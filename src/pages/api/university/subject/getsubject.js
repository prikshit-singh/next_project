
import varifyuser from '../../../../components/backendmodules/varifyuser.js'
import Subject from '../../models/universitymodels/subject.js';
import { connectDB } from '../../users/dbconfig/dbconfig.js'

export default async function handler(req, res) {
    try {
        await connectDB()
            const subject = await Subject.find({}).populate('createdby')
            if (subject) {
                res.status(200).send({ CODE: 200, result:subject });
            } else {
                res.status(200).send({ CODE: 405, result:subject });
            }
        
    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 401, message: error })

    }
};