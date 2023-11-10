// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { connectDB } from '@/pages/api/users/dbconfig/dbconfig.js'
import { connectDB } from '../../users/dbconfig/dbconfig.js'
import Signup from '../../models/signup.js';
import varifyuser from '../../../../components/backendmodules/varifyuser.js'
import Menu from '../../models/settings/menues/menu.js';



export default async function handler(req, res) {

    try {
        await connectDB()
        let menuId = req.body.id
        const updatedMenu = {
            title: req.body.title,
            url: req.body.url,
            submenus: req.body.submenus,
        };

        // Use findByIdAndUpdate to update the menu item
        const result = await Menu.findByIdAndUpdate(menuId, updatedMenu, { new: true });

        if (!result) {
            return res.status(404).json({ CODE: 404, message: 'Menu item not found' });
        }

        return res.status(200).json({ CODE: 200, result: result });
        return 0

        let cookies = req.headers.token
        if (cookies) {
            let userData = await varifyuser(cookies)
            if (userData) {
                const Menu1 = await new Menu({
                    title: req.body.title,
                    url: req.body.url,
                    createdby: userData._id
                });
                const result = await Menu1.save()
                return res.status(200).json({ CODE: 200, result: result })
            }
        } else {
            return res.status(200).json({ CODE: 503, result: 'Log In First' })
        }
    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 400, message: error })

    }


};

// export default router;