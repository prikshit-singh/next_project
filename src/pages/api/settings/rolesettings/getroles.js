
import varifyuser from '../../../../components/backendmodules/varifyuser.js'
import Roles from '../../models/settings/roles/roles.js'
import Admin_menu from '../../models/settings/menues/adminmenu.js'
import Menu from '../../models/settings/menues/menu.js'
import Profile_menu from '../../models/settings/menues/profilemenu.js'
import Settings from '../../models/settings/settings/settings.js'

import { connectDB } from '../../../api/users/dbconfig/dbconfig'

export default async function handler(req, res) {
    try {
        await connectDB()
        const adminmenu = await Admin_menu.find({})
        const menu = await Menu.find({})
        const profile_menu = await Profile_menu.find({})
        const settings = await Settings.find({})
            const roles = await Roles.find({}).populate('canaccessmenus').populate('canaccessprofilemenus').populate('canaccess')
            if (roles) {
                res.status(200).send({ CODE: 200, roles });
            } else {
                res.status(200).send({ CODE: 405, roles });
            }
        
    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 401, message: error })

    }
};