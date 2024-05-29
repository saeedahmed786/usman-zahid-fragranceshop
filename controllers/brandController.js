const Brand = require('../models/brandModel');
const cloudinaryCon = require('../middlewares/cloudinaryConf');

exports.getAllBrands = async (req, res) => {
    try {
        Brand.find({})
            .exec((error, brands) => {
                if (error) {
                    res.status(404).json({ errorMessage: 'Error in finding brands' });
                }
                if (brands) {
                    res.status(200).send(brands);
                }
            });

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

exports.createBrand = async (req, res) => {
    try {
        const brand = new Brand({
            name: req.body.name,
            picture: req.body.picture,
        });

        const newBrand = brand.save();
        if (newBrand) {
            res.status(200).json({ successMessage: `Brand created successfully` });
        } else {
            res.status(400).json('Brand is not created. Please Try Again')
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}


exports.getBrandById = async (req, res) => {
    try {
        const getBrand = await Brand.findById({ _id: req.params.id });
        if (getBrand) {
            res.status(200).json(getBrand);
        }
        else {
            res.status(400).json({ errorMessage: 'Brand not found. Please try again' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

exports.updateBrand = async (req, res) => {
    try {
        const getBrand = await Brand.findById({ _id: req.params.id });
        if (getBrand) {
            getBrand.name = req.body.name;
            getBrand.picture = req.body.picture;

            const newBrand = await getBrand.save();
            if (newBrand) {
                res.status(200).json({ successMessage: `Brand updated successfully` });
            } else {
                res.status(400).json({ errorMessage: 'Brand not updated. Please try again' })
            }
        }
        else {
            res.status(400).json({ errorMessage: 'Brand not found. Please try again' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

exports.deleteBrand = async (req, res) => {
    try {
        const getBrand = await Brand.findById({ _id: req.params.id })
        if (getBrand) {
            await cloudinaryCon?.uploader.destroy(getBrand?.picture?.id);
            getBrand.remove();
            res.status(200).json({ successMessage: `Brand ${getBrand.name} has been deleted successfully` });
        } else {
            res.status(400).json({ errorMessage: 'Brand could not be deleted. Please try again' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}
