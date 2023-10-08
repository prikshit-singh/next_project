// pages/api/upload.js
import { connectDB } from '../users/dbconfig/dbconfig.js'
import Blog from '../models/blog';
import path from 'path';
import fs from 'fs'
import { IncomingForm } from 'formidable';
import { join } from 'path';
import { readFile } from 'fs/promises';
import varifyuser from '../../../components/backendmodules/varifyuser.js'
import Signup from '../models/signup';
import { getSession } from 'next-auth/react';
import multer from 'multer';
import nextConnect from 'next-connect';
import Papers from '../models/previousyearpaper.js';





export const config = {
    api: {
        bodyParser: false,
    }
}

export default async function handler(req, res) {

    try {
        await connectDB()
        fs.access(path.join(process.cwd() + "/public", "/previousyearpaperspdf"), async (error) => {
            // To check if the given directory 
            // already exists or not
            if (error) {
                // If current directory does not exist
                // then create it
                fs.mkdir(path.join(process.cwd() + "/public", "/previousyearpaperspdf"), async (error) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("New Directory created successfully !!");

                        // const session = await getSession(req);
                        // console.log('verifyTokan', session)
                        const form = new IncomingForm();
                        // Set the upload directory
                        form.uploadDir = path.join(process.cwd(), 'public/previousyearpaperspdf');
                        // Parse the incoming form data
                        form.on('fileBegin', function (name, file) {
                            // Modify the filename as per your requirements
                            // console.log(file)
                            // const fileName = Date.now() + '_' + file.newFilename + '.pdf'
                            // file.originalFilename = fileName
                            file.path = path.join(form.uploadDir, file.originalFilename);
                        });


                        form.parse(req, async (err, fields, files) => {
                            if (err) {
                                console.error(err);

                            }
                            // console.log(fields)
                            // Move the uploaded file to the desired location


                            // const oldPath = files.image[0].filepath;
                            // console.log(1,files.image[0].path.split('/')[0].split('//'))
                            // const newPath = files.image[0].path
                            // fs.renameSync(oldPath, newPath);
                            // const baseUrl = `${process.env.IMAGE_DOMANE}/images/`
                            // const imagePath = await files.image[0].originalFilename

                            // const imageContent = baseUrl + imagePath
                            // let fileNameTime = Date.now()
                            // fs.writeFileSync(`public/files/${fileNameTime}.txt`, fields.content[0]);



                            // const user = await varifyuser(fields.token[0])




                            // if (user) {
                            //     var userData = await Signup.find({ email: user.email })
                            // }
                            // const blog = await new Blog({
                            //     title: fields.title[0],
                            //     subtitle: fields.subtitle[0],
                            //     slug: fields.slug[0],
                            //     keywords: fields.keywords[0],
                            //     content: `${process.env.IMAGE_DOMANE}/files/${fileNameTime}.txt`,
                            //     image: imageContent,
                            //     date: fields.date[0],
                            //     writtenby: userData[0]._id,
                            //     LikedBy: [],
                            //     isvarified: 'false',
                            //     description: '',
                            //     Comments: [],
                            // });
                            // const result = await blog.save()
                            // console.log(result)
                            return res.status(200).json({ CODE: 200, msg: 'ok' })
                            // res.status(200).send({ msg: 'file stored successfully' })
                        });






                    }
                });
            } else {
                console.log("Given Directory already exists !!");
                // const session = await getSession(req);
                // console.log('verifyTokan', session)
                const form = new IncomingForm();


                // Set the upload directory

                form.uploadDir = path.join(process.cwd(), 'public/previousyearpaperspdf');
                // Parse the incoming form data
                form.on('fileBegin', function (name, file) {
                    // Modify the filename as per your requirements
                    // console.log(file)
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const customFileName = `${file.originalFilename}`;
                    file.newFilename = customFileName
                    file.filepath = path.join(form.uploadDir, customFileName);
                });

                form.parse(req, async (err, fields, files) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'File upload failed.' });

                    }
                   
                    const oldPath = files.pdf[0].filepath;
                    // // console.log(1,files.pdf[0].path.split('/')[0].split('//'))
                    const destinationDirPath = `public/previousyearpaperspdf/${fields.university[0]}/${fields.course[0]}/${fields.year[0]}/${fields.semester[0]}`
                    if (!fs.existsSync(destinationDirPath)) {
                        fs.mkdirSync(destinationDirPath, { recursive: true });
                    }
                    const destinationFilePath = path.join(destinationDirPath, path.basename(oldPath))
                    fs.renameSync(oldPath, destinationFilePath);
                    const baseUrl = `${process.env.IMAGE_DOMANE}/previousyearpaperspdf/${fields.university[0]}/${fields.course[0]}/${fields.year[0]}/${fields.semester[0]}/`
                    const pdfPath = await files.pdf[0].originalFilename
                    const pdfPathContent = baseUrl + pdfPath
                    const user = await varifyuser(fields.token[0])
                    if (user) {
                        var userData = await Signup.find({ email: user.email })
                    }
                    const paper = await new Papers({
                        university: fields.university[0],
                        college: fields.college[0],
                        content: pdfPathContent,
                        state: fields.state[0],
                        city: fields.city[0],
                        course: fields.course[0],
                        subject:fields.subject[0],
                        year: fields.year[0],
                        semester: fields.semester[0],
                        uploadby: userData[0]._id,
                        isvarified: 'false',
                    });
                    const result = await paper.save()
                    return res.status(200).json({ CODE: 200, result: result })
                    // res.status(200).send({ msg: 'file stored successfully' })
                });
            }
        });
    } catch (error) {
        return res.status(200).json({ CODE: 400, error })

    }


};






















// Configure multer to store uploaded files in the 'public/uploads' directory
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: path.join(process.cwd(), 'public/previousyearpaperspdf'),
//     filename: (req, file, callback) => {
//       callback(null, `${Date.now()}-${file.originalname}`);
//     },
//   }),
// });

// const apiRoute = nextConnect({
//   onError(error, req, res) {
//     res.status(500).json({ error: `Server error: ${error.message}` });
//   },
// });

// // Middleware to handle file upload
// apiRoute.use(upload.single('pdf')); // 'pdf' is the name of the input field in the form

// apiRoute.post((req, res) => {
//   // If the file is successfully uploaded, you can send a response with the file details
//   const { filename, path: filePath } = req.file;

//   // You can optionally store the file details in a database or perform other actions here

//   res.status(200).json({ success: true, filename, filePath });
// });

// export default apiRoute;
