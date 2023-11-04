// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { connectDB } from '@/pages/api/users/dbconfig/dbconfig.js'
import { connectDB } from '../users/dbconfig/dbconfig.js'
import Signup from '../models/signup.js';
import varifyuser from '../../../components/backendmodules/varifyuser.js'
import Subject from '../models/universitymodels/subject.js';
import State from '../models/universitymodels/state.js';
import City from '../models/universitymodels/city.js'
import Course from '../models/universitymodels/course.js'

export default async function handler(req, res) {

    try {
        await connectDB()
        const results = [];

        const response = await City.aggregate([
            {
                $group: {
                    _id: { title: "$title" },
                    count: { $sum: 1 }
                }
            },
            {
                $match: {
                    count: { $gt: 1 }
                }
            }
        ])
        const duplicateTitles = response.map(entry => entry._id.title);
        // await State.deleteMany({ title: { $in: duplicateTitles } });
        // return res.status(200).json({ CODE: 200, message: 'Duplicate documents removed' });
        return res.status(200).json({ CODE: 200, result: duplicateTitles })

    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 400, message: error })

    }


};

// export default router;
