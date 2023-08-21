// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectDB } from '@/pages/api/users/dbconfig/dbconfig.js'
import Blog from '../models/blog';
import path from 'path';
import fs from 'fs'
import { IncomingForm } from 'formidable';
import { join } from 'path';
import { readFile } from 'fs/promises';
import varifyuser from '@/components/backendmodules/varifyuser'
import Signup from '../models/signup';
export const config = {
  api: {
    bodyParser: false,
  }
}

export default async function handler(req, res) {

  try {
    await connectDB()
    fs.access(path.join(process.cwd() + "/public", "/images"), async (error) => {
      // To check if the given directory 
      // already exists or not
      if (error) {
        // If current directory does not exist
        // then create it
        fs.mkdir(path.join(process.cwd() + "/public", "/images"), async (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log("New Directory created successfully !!");
            const form = new IncomingForm();

            // Set the upload directory
            form.uploadDir = path.join(process.cwd(), 'public/images');

            // Parse the incoming form data
            form.on('fileBegin', function (name, file) {
              // Modify the filename as per your requirements
              console.log(1)
              const fileName = Date.now() + '_' + file.newFilename + path.extname('.jpg');
              file.path = path.join(form.uploadDir, fileName);
            });


            form.parse(req, async (err, fields, files) => {
              if (err) {
                console.error(err);
                return false;
              }

              // Move the uploaded file to the desired location
              const oldPath = files.image[0].filepath;
              const newPath = files.image[0].path
              fs.renameSync(oldPath, newPath);
              res.status(200).send({ msg: 'file stored successfully' })

            });

          }
        });
      } else {
        console.log("Given Directory already exists !!");
        const form = new IncomingForm();
        // Set the upload directory
        form.uploadDir = path.join(process.cwd(), 'public/images');
        // Parse the incoming form data
        form.on('fileBegin', function (name, file) {
          // Modify the filename as per your requirements
          const fileName = Date.now() + '_' + file.newFilename + '.jpg'
          file.originalFilename=fileName
          file.path = path.join(form.uploadDir, fileName);
        });


        form.parse(req, async (err, fields, files) => {
          if (err) {
            console.error(err);

          }
          // console.log(fields)
          // Move the uploaded file to the desired location

         
          const oldPath = files.image[0].filepath;
          // console.log(1,files.image[0].path.split('/')[0].split('//'))
          const newPath = files.image[0].path
          fs.renameSync(oldPath, newPath);
          const baseUrl = `${process.env.IMAGE_DOMANE}/images/`
          const imagePath = await files.image[0].originalFilename
          console.log('imagepath',files.image[0])

          const imageContent = baseUrl+imagePath
          let fileNameTime = Date.now()
          fs.writeFileSync(`public/files/${fileNameTime}.txt`, fields.content[0]);
         const user =await varifyuser(fields.token[0])
         if(user){
         var userData =await Signup.find({email:user.email})
         }
            const blog = await new Blog({
              title: fields.title[0],
              subtitle: fields.subtitle[0],
              slug: fields.slug[0],
              keywords: fields.keywords[0],
              content: `${process.env.IMAGE_DOMANE}/files/${fileNameTime}.txt`,
              image: imageContent,
              date: fields.date[0],
              writtenby: userData[0]._id,
              LikedBy:[],
              isvarified:'false',
              description:'',
              Comments:[],
            });
            const result = await blog.save()
            // console.log(result)
            return res.status(200).json({CODE:200, result })
          // res.status(200).send({ msg: 'file stored successfully' })
        });
      }
    });
  } catch (error) {
    console.log(2)
    return res.status(200).json({CODE:400, error })

  }


};

// export default router;
