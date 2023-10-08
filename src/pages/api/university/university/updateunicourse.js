import mongoose from 'mongoose'; // Import Mongoose
import { connectDB } from '../../users/dbconfig/dbconfig.js';
import varifyuser from '../../../../components/backendmodules/varifyuser.js';
import University from '../../models/universitymodels/university.js';

export default async function handler(req, res) {
  try {
    await connectDB();
    let token = req.headers.token;
    if (token) {
      let userData = await varifyuser(token);

      if (userData) {
        // Convert the course ID from string to ObjectId
        console.log(req.body.courses)
        
        // Find the university by its ID
        let findUniversity = await University.findById(req.body.universityId);

        if (!findUniversity) {
          return res.status(404).send({ CODE: 301, msg: 'University not found' });
        }

        // Use $push with the converted ObjectId
        const updatedUniversity = await University.findOneAndUpdate(
          { _id: req.body.universityId },
          {  course: req.body.course  },
          { new: true }
        );

        if (!updatedUniversity) {
          return res.status(404).send({ CODE: 301, msg: 'University not found' });
        }

        res.status(200).send({ CODE: 301, msg: updatedUniversity });
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