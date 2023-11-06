// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { connectDB } from '@/pages/api/users/dbconfig/dbconfig.js'
import { connectDB } from '../../users/dbconfig/dbconfig.js'
import varifyuser from '../../../../components/backendmodules/varifyuser.js'
import Settings from '../../models/settings/settings/settings.js'


export default async function handler(req, res) {

    try {
        await connectDB()

        const Settings1 = await new Settings({
            title: req.body.title?req.body.title:'title',
            parentMenu:req.body.parentMenu,
            createdby:  '651a8949d2b3e42f71c18de0'
        });
        const result = await Settings1.save()
        return res.status(200).json({ CODE: 200, result: result })
        let cookies =  req.headers.token
        if (cookies) {
            let userData = await varifyuser(cookies)
            if (userData) {
                const Settings1 = await new Settings({
                    title: req.body.title?req.body.title:'title',
                    parentmenu:req.body.parentmenu,
                    createdby: userData._id
                });
                const result = await Settings1.save()
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
