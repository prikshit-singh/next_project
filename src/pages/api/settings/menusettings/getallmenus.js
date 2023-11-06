import varifyuser from '../../../../components/backendmodules/varifyuser.js'
import Menu from '../../models/settings/menues/menu.js';
import University from '../../models/universitymodels/university.js';
import { connectDB } from '../../users/dbconfig/dbconfig.js'
import Course from '../../models/universitymodels/course.js';
import Signup from '../../models/signup.js';
import Roles from '../../models/settings/roles/roles.js';

export default async function handler(req, res) {
    try {
        await connectDB()
        const menus = await Menu.find({})
        if (menus) {
            res.status(200).send({ CODE: 200, menus: menus });
        } else {
            res.status(200).send({ CODE: 405, menus: menus });
        }

        return 0;
        let token = req.headers.token
        if (token) {
            // token= token.split('token=')[1]
            let userData = await varifyuser(token)
            if (userData.CODE == 200) {
                //here i will find user menus which can be accessed 
               const user = await Signup.find({_id:userData._id}).populate('roles')
                const menus = await Menu.find({})
                if (menus) {
                    res.status(200).send({ CODE: 200, menus: menus,user });
                } else {
                    res.status(200).send({ CODE: 405, menus: menus });
                }
            } else {


                //token exist but userData not find
                const user = await Signup.find({_id:userData._id}).populate('roles')
                const menus = await Menu.find({})
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