const cloudinary = require('../middlewares/cloudinary');
const cloudinaryCon = require('../middlewares/cloudinaryConf');
const fs = require("fs");

exports.uploadFiles = async (req, res) => {
    try {
        console.log(req.file);
        if (req.file) {
            const uploader = async (path) => await cloudinary.uploads(path, 'My Shop')
            const urls = [];
            const { path } = req.file;
            const newPath = await uploader(path)
            console.log(newPath);
            urls.push(newPath);
            fs.unlinkSync(path);
            res.status(200).json(urls[0])
        } else {
            res.status(400).json({ errorMessage: 'Files could not be uploaded.' });
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ errorMessage: 'Files could not be uploaded.', error });
    }
}

exports.deleteFile = async (req, res) => {
    try {
        if (req.body.file) {
            let file = req.body.file;
            await cloudinaryCon.uploader.destroy(file.id);
            res.status(200).json({ successMessage: 'File deleted successfully' })
        } else {
            res.status(400).json({ errorMessage: 'File could not be deleted.' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ errorMessage: 'Files could not be uploaded.', error });
    }
} 