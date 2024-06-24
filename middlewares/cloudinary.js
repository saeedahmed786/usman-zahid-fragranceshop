const cloudinary = require('cloudinary');
const config = require('../config/keys');

cloudinary.config({
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_SECRET_KEY
});

exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.secure_url,
                id: result.public_id
            })
        }, {
            resource_type: "auto",
            folder,
            quality: "auto:best",
            fetch_format: "auto",
        })
    })
}