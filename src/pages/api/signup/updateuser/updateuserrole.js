import { connectDB } from '../../users/dbconfig/dbconfig.js';
import Signup from '../../models/signup.js';
import varifyuser from '../../../../components/backendmodules/varifyuser.js'
export default async function handler(req, res) {
  try {
    await connectDB();
    let cookies =  req.headers.token
    if (cookies) {
        let userData = await varifyuser(cookies)
        console.log('userData',userData)
        if (userData.CODE !== 200) {
          return res.status(200).json({ CODE: 404, result: 'Login First' });
        }else{
          const userId = req.body.id; // Assuming you have the user's ID in the request body
          const newRole = req.body.roles; // The new role to add
      
          // Find the user by ID and update the roles array
          const updatedSignup = await Signup.findOneAndUpdate(
            { _id: userId },
            { roles: newRole } , // Use $push to add the new role to the roles array
            { new: true } // Return the updated document
          );
      
          if (!updatedSignup) {
            return res.status(404).json({ CODE: 404, result: 'User not found' });
          }
      
          return res.status(200).json({ CODE: 200, result: updatedSignup });
        }
      }
    // Get the user ID and the new role from the request body
    
  } catch (error) {
    console.log(error);
    return res.status(200).json({ CODE: 400, message: error });
  }
}
