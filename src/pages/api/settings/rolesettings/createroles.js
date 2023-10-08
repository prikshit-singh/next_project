// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectDB } from '../../users/dbconfig/dbconfig.js'
import varifyuser from '../../../../components/backendmodules/varifyuser.js'
import Roles from '../../models/settings/roles/roles.js';


export default async function handler(req, res) {

    try {
        await connectDB()
        let cookies =  req.headers.token
        if (cookies) {
            let userData = await varifyuser(cookies)
            if (userData) {
                const Roles1 = await new Roles({
                    title: req.body.title,
                    canaccess:req.body.canaccess,
                    canaccessmenus:req.body.canaccessmenus,
                    canaccessprofilemenus:req.body.canaccessprofilemenus,
                    createdby: userData._id
                });
                const result = await Roles1.save({ new: true })
                return res.status(200).json({ CODE: 200, result: result })
            }}else{
             return res.status(200).json({ CODE: 503, result: 'Log In First' })
            }
    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 400, message: error })

    }


};

// export default router;
