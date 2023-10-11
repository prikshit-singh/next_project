// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { connectDB } from '@/pages/api/users/dbconfig/dbconfig.js'
import { connectDB } from '../../users/dbconfig/dbconfig.js'
import Signup from '../../models/signup.js';
import varifyuser from '../../../../components/backendmodules/varifyuser.js'
import University from '../../models/universitymodels/university.js';
import path from 'path';
import fs from 'fs'
import { IncomingForm } from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    }
}
export default async function handler(req, res) {
    try {
        await connectDB()
        fs.access(path.join(process.cwd() + "/public", "/universitylogo"), async (error) => {
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
                const form =await new IncomingForm();

                // Set the upload directory

                form.uploadDir = path.join(process.cwd(), 'public/universitylogo');

                // Example: Move the uploaded file(s) to a specific directory
                const uploadDirectory = 'public/universitylogo';
                if (!fs.existsSync(uploadDirectory)) {
                  fs.mkdirSync(uploadDirectory, { recursive: true });
                }

                console.log(2)

                // Parse the incoming form data
                form.on('fileBegin', function (name, file) {
                    // Modify the filename as per your requirements
                    console.log('name',name,file)
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const customFileName = `${file.originalFilename}`;
                    file.newFilename = customFileName
                    file.filepath = path.join(form.uploadDir, customFileName);
                });
                form.parse(req, async (err, fields, files) => {
                    console.log('files',files)
                    if (err) {
                        console.log('files',files)
                        console.error(err);
                        return res.status(500).json({ error: 'File upload failed.' });

                    }
                   console.log('files',files)
                    const oldPath = files.universitylogo[0].filepath;
                    console.log(oldPath)
                    // // console.log(1,files.pdf[0].path.split('/')[0].split('//'))
                    const destinationDirPath = `public/universitylogo/${fields.universitycode[0]}/`
                    console.log('destinationDirPath',destinationDirPath)
                    if (!fs.existsSync(destinationDirPath)) {
                        fs.mkdirSync(destinationDirPath, { recursive: true });
                    }
                    const destinationFilePath = path.join(destinationDirPath, path.basename(oldPath))
                    fs.renameSync(oldPath, destinationFilePath);
                    const baseUrl = `${process.env.IMAGE_DOMANE}/universitylogo/${fields.universitycode[0]}/`
                    const pdfPath = await files.universitylogo[0].originalFilename
                    const pdfPathContent = baseUrl + pdfPath
                    const user = await varifyuser(fields.token[0])
                console.log(fields.course[0])
                    if (user) {
                        const University1 = await new University({
                            title: fields.title[0].toLowerCase(),
                            universitycode:fields.universitycode[0].toLowerCase(),
                            state:fields.state[0],
                            city:fields.city[0],
                            universitylogo:pdfPathContent,
                            course:fields.course[0],
                            createdby: user._id
                        });
                        const result = await University1.save()
                        return res.status(200).json({ CODE: 200, result: result })
                    }
                    // res.status(200).send({ msg: 'file stored successfully' })
                });
            }
        });
    } catch (error) {
        console.log(111,error)
        return res.status(200).json({ CODE: 400, error })

    }
   


};

// export default router;
