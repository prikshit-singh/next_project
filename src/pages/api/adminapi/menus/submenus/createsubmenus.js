// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { connectDB } from '@/pages/api/users/dbconfig/dbconfig.js'
import { connectDB } from '../../../users/dbconfig/dbconfig.js'
import Signup from '../../../models/signup.js';
import varifyuser from '../../../../../components/backendmodules/varifyuser.js'
import Submenus from '../../../models/settings/menues/submenus.js';



export default async function handler(req, res) {

    try {
        await connectDB()

        const Submenus1 = await new Submenus({
            title: req.body.title,
            url: req.body.url,
            createdby: '652859378995bc1199080ad0'
        });
        const result = await Submenus1.save()
        return res.status(200).json({ CODE: 200, result: result })
    return 0



        let cookies =  req.headers.token
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
            }}else{
             return res.status(200).json({ CODE: 503, result: 'Log In First' })
            }
    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 400, message: error })

    }


};

// export default router;