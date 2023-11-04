import mongoose from 'mongoose'; // Import Mongoose
import { connectDB } from '../../users/dbconfig/dbconfig.js';
import varifyuser from '../../../../components/backendmodules/varifyuser.js';
import University from '../../models/universitymodels/university.js';

export default async function handler(req, res) {
    try {
        await connectDB();
        let token = req.headers.token;
        console.log('ttt',token)
        if (token) {
            let userData = await varifyuser(token);

            if (userData) {
               
                const update = {
                    title: req.body.title.toLowerCase(),
                    universitycode: req.body.universitycode.toLowerCase(),
                    state: req.body.state,
                    city: req.body.city,
                    course: req.body.course,
                };
                // Use $push with the converted ObjectId
                console.log(121,update)
                const updatedUniversity = await University.findOneAndUpdate(
                    { _id: req.body.ID },
                    update,
                    { new: true } // To return the updated document
                );
                console.log(123)

                if (updatedUniversity) {
                    return res.status(200).json({ CODE: 200, result: updatedUniversity })

                } else {
                    return res.status(200).json({ CODE: 503, result: 'Log In First' })
                }

            } else {
                res.status(200).send({ CODE: 301, msg: 'Please login first' });
            }
        } else {
            res.status(200).send({ CODE: 301, msg: 'Please login first' });
        }
    } catch (error) {
        return res.status(500).json({ CODE: 401, message: error });
    }
}