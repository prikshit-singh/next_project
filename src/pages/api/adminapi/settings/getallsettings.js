// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { connectDB } from '@/pages/api/users/dbconfig/dbconfig.js'
import { connectDB } from '../../users/dbconfig/dbconfig.js'
import varifyuser from '../../../../components/backendmodules/varifyuser.js'
import Settings from '../../models/settings/settings/settings.js'


export default async function handler(req, res) {

    try {
        await connectDB()

       
        let cookies =  req.headers.token
        if (cookies) {
            let userData = await varifyuser(cookies)
            if (userData) {
                const settings =await Settings.find({})
                return res.status(200).json({ CODE: 200, result: settings })
            }}else{
             return res.status(200).json({ CODE: 503, result: 'Log In First' })
            }
    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 400, message: error })

    }


};

// export default router;
