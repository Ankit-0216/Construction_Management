const cloudinary = require("cloudinary").v2; //import cloudinary sdk
const dotenv = require("dotenv");

dotenv.config();

//to configure cloudinary with credentials from .env file
cloudinary.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//function handling the file upload to cloudinary
exports.uploads = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      {
        resource_type: "auto", //automatically detect resource type
        folder: folder, //set the folder where the uploaded file will be stored
      },
      (error, result) => {
        if (error) {
          // If there's an error during the upload, reject the Promise with the error
          reject(error);
        } else {
          // If upload is successful, resolve the Promise with the uploaded file's URL and public ID
          resolve({
            url: result.url,
            id: result.public_id,
          });
        }
      }
    );
  });
};
