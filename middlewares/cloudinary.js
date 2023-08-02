const cloudinary = require('cloudinary').v2;


          
cloudinary.config({ 
  cloud_name: 'dpcnnbwsd', 
  api_key: '424972715835941', 
  api_secret: 'fivfFgaaeYEG1OfoRsQQJAeS8ms' 
});

exports.uploadImage = async (imagePath) => {

  // Use the uploaded file's name as the asset's public ID and 
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};