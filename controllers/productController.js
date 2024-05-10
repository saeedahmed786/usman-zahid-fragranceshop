const Product = require('../models/productModel');
const cloudinaryCon = require('../middlewares/cloudinary');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().limit(20)
      .populate('seller').exec();
    if (products) {
      res.status(200).send(products);
    } else {
      res.status(404).json({ errorMessage: 'No Products found!' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

exports.getLimitedProducts = async (req, res) => {
  try {
    let minPrice;
    let maxPrice;
    if (req.body.priceRange) {
      minPrice = req.body.priceRange?.split("-")[0];
      maxPrice = req.body.priceRange?.split("-")[1];
    } else {
      minPrice = 0
      maxPrice = 30000
    }

    let query = {};

    if (req.body.category) {
      query.subCategory = req.body.category;
    }

    if (minPrice && maxPrice) {
      query.price = { $gte: minPrice, $lte: maxPrice }; // Filter by price range
    }

    const PAGE_SIZE = 20;
    const page = parseInt(req.params.page || "0")
    const products = await Product.find(query).limit(PAGE_SIZE).skip(PAGE_SIZE * page)
      .populate('mainCategory subCategory').sort({ createdAt: -1 }).exec();
    const count = await Product.countDocuments({});
    if (products) {
      res.status(200).send({ products, count });
    } else {
      res.status(404).json({ errorMessage: 'No Products found!' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

exports.getFeaturedProducts = async (req, res) => {
  const products = await Product.find({ featured: true }).limit(20).sort({ "createdAt": '-1' })
    .populate('mainCategory subCategory').exec();
  try {
    if (products) {
      res.status(200).send(products);
    } else {
      res.status(404).json({ errorMessage: 'No Products found!' });
    }
  } catch (error) {
    res.status(404).json({ errorMessage: 'Error in finding products', error });
  }

}

exports.getAllAdminProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('mainCategory subCategory').exec();
    if (products) {
      res.status(200).send(products);
    } else {
      res.status(404).json({ errorMessage: 'No Products found!' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

exports.getProductById = async (req, res) => {
  try {
    const findProduct = await Product.findOne({ _id: req.params.id }).populate('seller').exec();
    if (findProduct) {
      res.status(200).send(findProduct);
    } else {
      res.status(404).json({ errorMessage: 'No Products found!' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

exports.searchProducts = async (req, res) => {
  try {
    const findProducts = await Product.find({ $or: [{ title: { $regex: new RegExp(req.body.title, 'i') } }, { subTitle: { $regex: new RegExp(req.body.title, 'i') } }] })
      .populate('mainCategory subCategory')
      .exec();
    if (findProducts) {
      res.status(200).json(findProducts);
    } else {
      res.status(404).json({ errorMessage: 'No products found' });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: 'Error in finding products', error });
  }
};


exports.filterProducts = async (req, res) => {
  try {
    let minPrice;
    let maxPrice;
    if (req.body.priceRange) {
      minPrice = req.body.priceRange?.split("-")[0];
      maxPrice = req.body.priceRange?.split("-")[1];
    } else {
      minPrice = 0
      maxPrice = 30000
    }

    let query = {};

    if (req.body.category) {
      query.subCategory = req.body.category;
    }

    if (minPrice && maxPrice) {
      query.price = { $gte: minPrice, $lte: maxPrice }; // Filter by price range
    }

    const PAGE_SIZE = 20;
    const page = parseInt(req.params.page || "0")

    const findProducts = await Product.find(query)
      .limit(PAGE_SIZE).skip(PAGE_SIZE * page)
      .populate('mainCategory subCategory').exec();
    if (findProducts) {
      res.status(200).json(findProducts);
    } else {
      res.json({ errorMessage: 'No products found' })
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}


exports.uploadProduct = async (req, res) => {
  try {
    const product = new Product({
      title: req.body.title,
      subTitle: req.body.subTitle,
      gender: req.body.gender,
      description: req.body.description,
      seller: req.user._id,
      user: req.user._id,
      price: req.body.price,
      originalPrice: req.body.originalPrice,
      qty: req.body.qty,
      shippingDetails: req.body.shippingDetails,
      featured: req.body.featured,
      mainCategory: req.body.mainCategory,
      subCategory: req.body.subCategory,
      pictures: req.body.pictures
    });

    await product.save(((error, result) => {
      if (error) {
        res.status(400).json({ errorMessage: 'Failed to create product. Please try again', error })
      }
      if (result) {
        res.status(200).send({ successMessage: 'Product created successfully', result });
      }
    }))
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}



exports.updateProduct = async (req, res) => {
  try {
    const findProduct = await Product.findById({ _id: req.params.id });
    if (findProduct) {
      findProduct.title = req.body.title;
      findProduct.subTitle = req.body.subTitle;
      findProduct.gender = req.body.gender;
      findProduct.price = req.body.price;
      findProduct.originalPrice = req.body.originalPrice;
      findProduct.qty = req.body.qty;
      findProduct.featured = req.body.featured;
      findProduct.mainCategory = req.body.mainCategory;
      findProduct.subCategory = req.body.subCategory;
      findProduct.pictures = req.body.pictures;
      findProduct.description = req.body.description;

      await findProduct.save(((error, result) => {
        if (error) {
          res.status(400).json({ errorMessage: 'Failed to update product. Please try again', error })
        }
        if (result) {
          res.status(200).send({ successMessage: 'Product updated successfully', result });
        }
      }))
    }
    else {
      res.status(404).json({ errorMessage: 'Product not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}


exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id });
    if (product) {
      product.pictures.map(async pic => {
        await cloudinaryCon.uploader?.destroy(pic?.cloudinary_id);
      });
      product.remove();
      res.status(200).json({ successMessage: 'Product Deleted Successfully' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

exports.getRelatedProducts = async (req, res) => {
  try {
    if (req.params.id) {
      const products = await Product.find({ $or: [{ mainCategory: req.params.id }, { subCategory: req.params.id }] }).exec();
      if (products) {
        res.status(200).send(products);
      } else {
        res.status(201).json({ errorMessage: 'No Related Products' });
      }
    }
  } catch (error) {
    console.log(error);
  }
}


