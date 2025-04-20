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
    const PAGE_SIZE = 20;
    const page = parseInt(req.params.page || "0")
    const products = await Product.find().limit(PAGE_SIZE).skip(PAGE_SIZE * page)
      .populate('seller mainCategory subCategory').sort({ createdAt: -1 }).exec();
    const count = await Product.countDocuments({});
    console.log(products);
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

exports.getSellerLimitedProducts = async (req, res) => {
  const PAGE_SIZE = 20;
  const page = parseInt(req.params.page || "0")
  console.log(req.params)
  const products = await Product.find({ seller: req.params.id }).limit(PAGE_SIZE).skip(PAGE_SIZE * page)
    .populate('seller').exec();
  const count = await Product.countDocuments({});
  try {
    if (products) {
      res.status(200).send({ products, count });
    } else {
      res.status(404).json({ errorMessage: 'No Products found!' });
    }
  } catch (error) {
    res.status(404).json({ errorMessage: 'Error in finding products', error });
  }
}


exports.getFeaturedProducts = async (req, res) => {
  const products = await Product.find({ featured: true }).limit(20).sort({ "createdAt": '-1' })
    .populate('seller').exec();
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
    const products = await Product.find({ user: req.params.id })
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

exports.getProductByMultipleFilters = async (req, res) => {
  try {
    console.log(req.body);
    let query = {};

    if (req.body.query) {
      query.title = { $regex: `.*${req.body.query}.*`, $options: 'i' };
    }
    if (req.body.subject) {
      query.subject = req.body.subject;
    }
    if (req.body.color) {
      query.color = req.body.color;
    }
    if (req.body.tags) {
      query.style = req.body.tags;
    }

    const findProduct = await Product.find(query)
      .limit(20)
      .populate('seller')
      .exec();

    if (findProduct && findProduct.length > 0) {
      res.status(200).json(findProduct);
    } else {
      res.status(404).json({ errorMessage: 'No products found' });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: 'Error in finding products', error });
  }
};


exports.getProductByOneParameter = async (req, res) => {
  try {
    console.log("body", req.body);
    let minPrice;
    let maxPrice;
    if (req.body.priceRange?.length > 0) {
      minPrice = req.body.priceRange[0];
      maxPrice = req.body.priceRange[1];
    } else {
      minPrice = 0
      maxPrice = 3000
    }

    let query = {};

    if (req.body.par) {
      query.$or = [
        { subject: req.body.par },
        { color: req.body.par },
        { tags: req.body.par },
      ];
    }

    if (req.body.seller) {
      query.seller = req.body.seller;
    }

    if (minPrice && maxPrice) {
      query.price = { $gte: minPrice, $lte: maxPrice }; // Filter by price range
    }

    const findProducts = await Product.find(query)
      .limit(20)
      .populate('seller').exec();
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

exports.getSellerProductByOneParameter = async (req, res) => {
  let minPrice;
  let maxPrice;
  if (req.body.priceRange?.length > 0) {
    minPrice = req.body.priceRange[0];
    maxPrice = req.body.priceRange[1];
  } else {
    minPrice = 0
    maxPrice = 3000
  }

  let query = {
    seller: req.user._id, // Filter by seller
  };

  if (req.body.par) {
    query.$or = [
      { subject: req.body.par },
      { color: req.body.par },
      { tags: req.body.par },
    ];
  }

  if (req.body.seller) {
    query.seller = req.user._id;
  }

  if (minPrice && maxPrice) {
    query.price = { $gte: minPrice, $lte: maxPrice }; // Filter by price range
  }

  const findProducts = await Product.find(query)
    .limit(20)
    .populate('seller').exec();
  if (findProducts) {
    res.status(200).json(findProducts);
  } else {
    res.json({ errorMessage: 'No products found' })
  }
}

exports.getFilteredProductsCount = async (req, res) => {
  let searchBy = req.params.id;
  let query = {};
  console.log(req.body.field)

  if (req.body.field === "subject") {
    query = { subject: searchBy };
  } else if (req.body.field === "color") {
    query = { color: searchBy };
  } else if (req.body.field === "style") {
    query = { tags: searchBy };
  } else {
    console.log("invalid")
    return res.json({ errorMessage: 'Invalid field' });
  }

  try {
    const count = await Product.countDocuments(query);
    if (count) {
      res.status(200).json({ count });
    } else {
      res.status(200).json({ count: 0 });
    }

  } catch (error) {

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


