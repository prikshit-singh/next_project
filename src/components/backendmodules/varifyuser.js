import Jwt from 'jsonwebtoken';
import Signup from '../../pages/api/models/signup';
import { connectDB } from '@/pages/api/users/dbconfig/dbconfig'
export default async function handler(token) {
    console.log('tokenVarify', token)
    await connectDB()
    const veify =await Jwt.verify(token, 'this key is private');
    if (veify) {
    console.log('decoded', veify)

        const result = await Signup.findOne({ 'email': veify.email, 'password': veify.password })
        if (result) {

            return { CODE: 200, email: veify.email, password: veify.password, _id: veify._id }
        } else {
            return { CODE: 401, email: veify.email, password: veify.password }
        }
    }
    


    return veify
    // res.status(200).send(token)
}