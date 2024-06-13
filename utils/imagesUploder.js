const couldniary = require("cloudniary").v2;


exports.uploadTocloudinary = async (file, folder, height, quality)=>{
  try {
    const options = {folder};
    if (height) {
        options.height = height;
    }
    if (quality) {
        options.quality = quality;
    }
    options.resource_type = "auto"

    return await couldniary.uploader.upload(file.tempFilePath, options);

  } catch (error) {
      console.log("error in cloudinary " , error);
  }
}