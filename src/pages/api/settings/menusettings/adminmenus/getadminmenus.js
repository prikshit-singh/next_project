import varifyuser from '../../../../../components/backendmodules/varifyuser.js'
import Profile_menu from '../../../models/settings/menues/profilemenu.js';
import University from '../../../models/universitymodels/university.js';
import { connectDB } from '../../../../api/users/dbconfig/dbconfig'
import Signup from '../../../models/signup.js';
import Roles from '../../../models/settings/roles/roles.js';

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
               
               const userMenus = user[0].roles[0].canaccessprofilemenus
                const menus = await Profile_menu.find({ _id: { $in: userMenus }})
               
                if (menus) {
                    res.status(200).send({ CODE: 200, menus: menus });
                } else {
                    res.status(200).send({ CODE: 405, menus: menus });
                }
            } else {
                //token exist but userData not find
                console.log('token exist but userData not find')
                let userRole = await Roles.find({title:'user'})
                const menus = await Profile_menu.find({_id:userRole[0] ? userRole[0].canaccessprofilemenus:[]})
                // Map over menus to include the modified universities data
                if (menus) {
                    res.status(200).send({ CODE: 200, menus: menus,userRole });
                } else {
                    res.status(200).send({ CODE: 405, menus: menus });
                }
            }
        } else {
            let userRole = await Roles.find({title:'user'})

            const menus = await Profile_menu.find({_id:userRole[0] ? userRole[0].canaccessprofilemenus:[]})

           
            if (menus) {
                res.status(200).send({ CODE: 200, menus: menus });
            } else {
                res.status(200).send({ CODE: 405, menus: menus });
            }
        }


    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 401, message: error })

    }
};