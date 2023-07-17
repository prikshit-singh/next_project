// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectDB } from '@/pages/api/users/dbconfig/dbconfig.js'
import Blog from '../models/blog';
import path from 'path';
import fs from 'fs'
import { IncomingForm } from 'formidable';
import { join } from 'path';
import { readFile } from 'fs/promises';
export const config = {
  api: {
    bodyParser: false,
  }
}

// const readFile = async (req, saveLocally) => {
//   console.log(4)
//   // const options = formidable.Options
//   if (saveLocally) {
//     const form = new IncomingForm();

//     // Set the upload directory
//     form.uploadDir = path.join(process.cwd(), 'public/images');

//     // Parse the incoming form data
//     form.on('fileBegin', function (name, file) {
//       // Modify the filename as per your requirements

//       const fileName = file.originalFilename + path.extname('.jpg');
//       file.path = path.join(form.uploadDir, fileName);
//     });


//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         console.error(err);
//         return false;
//       }

//       // Move the uploaded file to the desired location
//       const oldPath = files.image[0].filepath;
//       const newPath = files.image[0].path
//       fs.renameSync(oldPath, newPath);
//       return true;
//     });
//   }

//   // const form = formidable(options)
//   // return new Promise((resolve, reject) => {
//   //   form.parse(req, (err, fields, files) => {
//   //     if (err) reject(err)
//   //     console.log(7)
//   //     resolve({ fields, files })
//   //   })
//   // })
// }

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
              const fileName = Date.now() + '_' + file.originalFilename + path.extname('.jpg');
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

          const fileName = Date.now() + '_' + file.originalFilename + path.extname('.jpg');
          file.path = path.join(form.uploadDir, fileName);
        });


        form.parse(req, async (err, fields, files) => {
          if (err) {
            console.error(err);

          }
          console.log(fields)
          // Move the uploaded file to the desired location
          const oldPath = files.image[0].filepath;
          const newPath = files.image[0].path
          fs.renameSync(oldPath, newPath);
          const baseUrl = 'http://localhost:3000/public/images/'
          const imagePath = join(process.cwd(), 'public/images', path.basename(newPath));
          const imageContent = await readFile(imagePath);
          console.log(imagePath)
         
            const blog = await new Blog({
              title: fields.title[0],
              subtitle: fields.subtitle[0],
              slug: fields.slug[0],
              keywords: fields.keywords[0],
              content: fields.content[0],
              image: imageContent,
              date: fields.date[0],
              content2: fields.content[0],
            });
            const result = await blog.save()
            console.log(result)
            return res.status(200).json({ result })
          

          // res.status(200).send({ msg: 'file stored successfully' })

        });
      }
    });
  } catch (error) {
    console.log(2)

  }


};

// export default router;
