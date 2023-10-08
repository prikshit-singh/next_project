
import varifyuser from '../../../../components/backendmodules/varifyuser.js'
import Roles from '../../models/settings/roles/roles.js'
import { connectDB } from '../../../api/users/dbconfig/dbconfig'
import Signup from '../../models/signup.js'

export default async function handler(req, res) {
    try {
        await connectDB()
        let cookies = req.headers.token;
        if(!cookies){
            res.status(200).send({ CODE: 405,cookies });
        }
        if (cookies) {
            let userData = await varifyuser(cookies);
            if(userData.CODE != 200){
                res.status(200).send({ CODE: 405, userData });
            }
            if (userData) {
                const user = await Signup.find({_id:userData._id}).populate('roles')
                const roles= await Roles.find({_id:user[0].roles[0]._id}).populate('canaccessprofilemenus')
              const  userMenuRoles = roles ? await roles[0].canaccessprofilemenus.map((data)=>{
                    return data.url
                }):[]
                if (roles) {
                    res.status(200).send({ CODE: 200, userMenuRoles });
                } else {
                    res.status(200).send({ CODE: 405, userMenuRoles });
                }
            }
        }
       

    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 401, message: error })

    }
};