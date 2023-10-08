import varifyuser from '../../../../components/backendmodules/varifyuser.js'
import Menu from '../../models/settings/menues/menu.js';
import University from '../../models/universitymodels/university.js';
import { connectDB } from '../../users/dbconfig/dbconfig.js'
import Course from '../../models/universitymodels/course.js';
import Signup from '../../models/signup.js';
import Roles from '../../models/settings/roles/roles.js';
import Subject from '../../models/universitymodels/subject.js'
export default async function handler(req, res) {
    try {
        await connectDB()

        const menus = await Menu.find({}) //_id: { $in: userMenus }
        const subjects = await Subject.find({});
        const course = await Course.find({});

        const subMenuUni = await University.find({}).populate({
            path: 'course',
            populate: {
                path: 'subject',
            },
        })
        // console.log(1,subMenuUni)

        const modifiedUniversities = subMenuUni.map((university) => {
            const { course, ...rest } = university._doc;
            return {
                ...rest,
                submenu: course.map((courseItem) => {
                    const { subject, ...rest } = courseItem._doc;
                    return {
                        ...rest,
                        submenu: subject, // Rename "subject" to "submenu"
                    }

                }),
            };
        });

        // Map over menus to include the modified universities data
        const newMenus = menus.map((menu) => {
            if (menu._id.toString() === '6519d5d4d2b3e42f71c18d7e') {
                return {
                    ...menu._doc,
                    submenu: modifiedUniversities, // Rename "course" to "submenu"
                };
            } else {
                return menu;
            }
        });
        if (newMenus) {
            res.status(200).send({ CODE: 200, menus: newMenus });
        } else {
            res.status(200).send({ CODE: 405, menus: newMenus });
        }



        // let token = req.headers.token
        // if (token) {
        //     // token= token.split('token=')[1]
        //     let userData = await varifyuser(token)
        //     if (userData.CODE == 200) {
        //         //here i will find user menus which can be accessed 
        //     //    const user = await Signup.find({_id:userData._id}).populate('roles')
        //     //    const userMenus = user[0].roles[0].canaccessmenus
        //         const menus = await Menu.find({}) //_id: { $in: userMenus }
        //         const subMenuUni = await University.find({}).populate({
        //             path: 'course',
        //             populate: {
        //                 path: 'subject',
        //             },
        //         })
        //         console.log(1,subMenuUni)

        //         const modifiedUniversities = subMenuUni.map((university) => {
        //             const { course, ...rest } = university._doc;
        //             return {
        //                 ...rest,
        //                 submenu: course.map((courseItem) => {
        //                     const { subject, ...rest } = courseItem._doc;
        //                     return {
        //                         ...rest,
        //                         submenu: subject, // Rename "subject" to "submenu"
        //                     }

        //                 }),
        //             };
        //         });

        //         // Map over menus to include the modified universities data
        //         const newMenus = menus.map((menu) => {
        //             if (menu._id.toString() === '6519d5d4d2b3e42f71c18d7e') {
        //                 return {
        //                     ...menu._doc,
        //                     submenu: modifiedUniversities, // Rename "course" to "submenu"
        //                 };
        //             } else {
        //                 return menu;
        //             }
        //         });
        //         if (newMenus) {
        //             res.status(200).send({ CODE: 200, menus: newMenus,user });
        //         } else {
        //             res.status(200).send({ CODE: 405, menus: newMenus });
        //         }
        //     } else {


        //         //token exist but userData not find
        //         console.log('token exist but userData not find')
        //         let userRole = await Roles.find({title:'user'})

        //         const menus = await Menu.find({_id:userRole[0] ? userRole[0].canaccessmenus:[]})

        //         const subMenuUni = await University.find({}).populate({
        //             path: 'course',
        //             populate: {
        //                 path: 'subject',
        //             },
        //         })

        //         const modifiedUniversities = subMenuUni.map((university) => {
        //             const { course, ...rest } = university._doc;
        //             return {
        //                 ...rest,
        //                 submenu: course.map((courseItem) => {
        //                     const { subject, ...rest } = courseItem._doc;
        //                     return {
        //                         ...rest,
        //                         submenu: subject, // Rename "subject" to "submenu"
        //                     }

        //                 }),
        //             };
        //         });

        //         // Map over menus to include the modified universities data
        //         const newMenus = menus.map((menu) => {
        //             if (menu._id.toString() === '6519d5d4d2b3e42f71c18d7e') {
        //                 return {
        //                     ...menu._doc,
        //                     submenu: modifiedUniversities, // Rename "course" to "submenu"
        //                 };
        //             } else {
        //                 return menu;
        //             }
        //         });
        //         if (newMenus) {
        //             res.status(200).send({ CODE: 200, menus: newMenus,userRole });
        //         } else {
        //             res.status(200).send({ CODE: 405, menus: newMenus });
        //         }
        //     }
        // } else {
        //     let userRole = await Roles.find({title:'user'})

        //     const menus = await Menu.find({_id:userRole[0] ? userRole[0].canaccessmenus:[]})

        //     const subMenuUni = await University.find({}).populate({
        //         path: 'course',
        //         populate: {
        //             path: 'subject',
        //         },
        //     })

        //     const modifiedUniversities = subMenuUni.map((university) => {
        //         const { course, ...rest } = university._doc;
        //         return {
        //             ...rest,
        //             submenu: course.map((courseItem) => {
        //                 const { subject, ...rest } = courseItem._doc;
        //                 return {
        //                     ...rest,
        //                     submenu: subject, // Rename "subject" to "submenu"
        //                 }

        //             }),
        //         };
        //     });

        //     // Map over menus to include the modified universities data
        //     const newMenus = menus.map((menu) => {
        //         if (menu._id.toString() === '6519d5d4d2b3e42f71c18d7e') {
        //             return {
        //                 ...menu._doc,
        //                 submenu: modifiedUniversities, // Rename "course" to "submenu"
        //             };
        //         } else {
        //             return menu;
        //         }
        //     });
        //     if (newMenus) {
        //         res.status(200).send({ CODE: 200, menus: newMenus });
        //     } else {
        //         res.status(200).send({ CODE: 405, menus: newMenus });
        //     }
        // }


    } catch (error) {
        console.log(error)
        return res.status(200).json({ CODE: 401, message: error })

    }
};