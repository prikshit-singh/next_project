import varifyuser from '../../../../../components/backendmodules/varifyuser.js'
import Profile_menu from '../../../models/settings/menues/profilemenu.js';
import { connectDB } from '../../../../api/users/dbconfig/dbconfig'
import Signup from '../../../models/signup.js';

export default async function handler(req, res) {
    try {
        await connectDB()
        let token = req.headers.token
        if (token) {
            // token= token.split('token=')[1]
            let userData = await varifyuser(token)
            if (userData.CODE == 200) {
                //here i will find user menus which can be accessed 
               const user = await Signup.find({_id:userData._id}).populate('roles')
                const menus = await Profile_menu.find({})
                if (menus) {
                    res.status(200).send({ CODE: 200, menus: menus,user });
                } else {
                    res.status(200).send({ CODE: 405, menus: menus });
                }
            } else {


                //token exist but userData not find
                const user = await Signup.find({_id:userData._id}).populate('roles')
                const menus = await Profile_menu.find({})
                if (menus) {
                    res.status(200).send({ CODE: 200, menus: menus,user });
                } else {
                    res.status(200).send({ CODE: 405, menus: menus });
                }
            }
        } else {
            res.status(200).send({ CODE: 405, result: "login first" });
        }


    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 401, message: error })

    }
};