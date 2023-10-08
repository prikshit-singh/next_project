import { connectDB } from '../../users/dbconfig/dbconfig.js';
import varifyuser from '../../../../components/backendmodules/varifyuser.js';
import Roles from '../../models/settings/roles/roles.js';

export default async function handler(req, res) {
    try {
        await connectDB();
        let cookies = req.headers.token;
        if (cookies) {
            let userData = await varifyuser(cookies);
            if (userData) {
                // Find the role you want to update by its _id
                const roleIdToUpdate = req.body.id; // Assuming you have the roleId in your request body
                const updatedFields = {
                    canaccess: req.body.canaccess,
                };

                // Use findOneAndUpdate to update the role
                const updatedRole = await Roles.findOneAndUpdate(
                    { _id: roleIdToUpdate },
                    updatedFields,
                    { new: true }
                );

                if (!updatedRole) {
                    return res
                        .status(404)
                        .json({ CODE: 404, result: 'Role not found' });
                }

                return res.status(200).json({ CODE: 200, result: updatedRole });
            } else {
                return res.status(200).json({ CODE: 503, result: 'Log In First' });
            }
        } else {
            return res.status(200).json({ CODE: 503, result: 'Log In First' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ CODE: 500, message: 'Internal Server Error' });
    }
}
