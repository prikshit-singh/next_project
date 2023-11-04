// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { connectDB } from '@/pages/api/users/dbconfig/dbconfig.js'
import { connectDB } from '../../users/dbconfig/dbconfig.js'
import Signup from '../../models/signup.js';
import varifyuser from '../../../../components/backendmodules/varifyuser.js'
import University from '../../models/universitymodels/university.js';
import path from 'path';
import fs from 'fs'
import { IncomingForm } from 'formidable';
import { json } from 'body-parser';

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

                       
                        const form = new IncomingForm();
                        // Set the upload directory
                        form.uploadDir = path.join(process.cwd(), 'public/previousyearpaperspdf');
                        // Parse the incoming form data
                        form.on('fileBegin', function (name, file) {
                            // Modify the filename as per your requirements
                           
                            file.path = path.join(form.uploadDir, file.originalFilename);
                        });


                        form.parse(req, async (err, fields, files) => {
                            if (err) {
                                console.error(err);

                            }
                           
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
                    const oldPath = files.universitylogo[0].filepath;
                    // // console.log(1,files.pdf[0].path.split('/')[0].split('//'))
                    const destinationDirPath = `public/universitylogo/${fields.universitycode[0]}/`

                    if (!fs.existsSync(destinationDirPath)) {
                        fs.mkdirSync(destinationDirPath, { recursive: true });
                    }
                    const destinationFilePath = path.join(destinationDirPath, path.basename(oldPath))
                    fs.renameSync(oldPath, destinationFilePath);
                    const baseUrl = `${process.env.IMAGE_DOMANE}/universitylogo/${fields.universitycode[0]}/`
                    const pdfPath = await files.universitylogo[0].originalFilename
                    const pdfPathContent = baseUrl + pdfPath
                    const user = await varifyuser(fields.token[0])

                    if (user) {
                        const existingSubject = await University.findOne({ title: fields.title[0].toLowerCase() });
        
                        if (existingSubject) {
                          return res.status(200).json({ CODE: 409, message: 'Title already exists' });
                        }
                        const University1 = await new University({
                            title: fields.title[0].toLowerCase(),
                            universitycode:fields.universitycode[0].toLowerCase(),
                            state:fields.state[0],
                            city:fields.city[0],
                            universitylogo:pdfPathContent,
                            course:fields.course[0].split(','),
                            createdby: user._id
                        });
                        const result = await University1.save()
                        return res.status(200).json({ CODE: 200, result: result })
                    }else{
                        return res.status(200).json({ CODE: 503, message: 'Login First' });
                    }
                });
            }
        });
    } catch (error) {
        console.log(111,error)
        return res.status(200).json({ CODE: 400, error ,message:'Something went wrong'})

    }
   


};

// export default router;
