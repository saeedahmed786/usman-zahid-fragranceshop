const Category = require('../models/categoryModel');
const cloudinaryCon = require('../middlewares/cloudinary');

function getAllCategoriesFunction(categories, parentId = null) {
    const categoryList = [];
    let category;

    // Handling both undefined and null for parentId
    if (parentId == null) {
        category = categories.filter(cat => !cat.parentId);
    } else {
        category = categories.filter(cat => cat.parentId && cat.parentId.toString() === parentId.toString());
    }

    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            picture: cate.picture,
            parentId: cate.parentId,
            children: getAllCategoriesFunction(categories, cate._id)
        });
    }
    return categoryList;
}

exports.getAllCategories = async (req, res) => {
    try {
        Category.find({}).exec((error, categories) => {
            if (error) {
                return res.status(404).json({ errorMessage: 'Error in finding categories' });
            }
            if (categories) {
                const categoryList = getAllCategoriesFunction(categories);
                return res.status(200).json(categoryList);
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
};


exports.getAllSimpleCategories = async (req, res) => {
    try {
        Category.find()
            .exec((error, categories) => {
                if (error) {
                    res.status(404).json({ errorMessage: 'Error in finding categories' });
                }
                if (categories) {
                    res.status(200).send(categories);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

exports.getAllMainCategories = async (req, res) => {
    try {
        Category.find({ parentId: null })
            .exec((error, categories) => {
                if (error) {
                    res.status(404).json({ errorMessage: 'Error in finding categories' });
                }
                if (categories) {
                    res.status(200).send(categories);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

exports.getAllSubCategories = async (req, res) => {
    Category.find({ parentId: { $exists: true } }).populate("parentId")
        .exec((error, categories) => {
            if (error) {
                res.status(404).json({ errorMessage: 'Error in finding categories' });
            }
            if (categories) {
                res.status(200).send(categories);
            }
        });
}

exports.getAllSubCategoriesById = async (req, res) => {
    try {
        Category.find({ parentId: req.params.id })
            .exec((error, categories) => {
                if (error) {
                    res.status(404).json({ errorMessage: 'Error in finding categories' });
                }
                if (categories) {
                    res.status(200).send(categories);
                }
            });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

exports.createMainCategory = async (req, res) => {
    try {
        const category = new Category({
            name: req.body.name,
            picture: req.body.picture,
        });

        const newCategory = category.save();
        if (newCategory) {
            res.status(200).json({ successMessage: `Category created successfully` });
        } else {
            res.status(400).json('Category is not created. Please Try Again')
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

exports.createSubCategory = async (req, res) => {
    try {
        const category = new Category({
            name: req.body.name,
            picture: req.body.picture,
            parentId: req.body.parentId
        });
        const newCategory = category.save();
        if (newCategory) {
            res.status(200).json({ successMessage: `Category created successfully` });
        } else {
            res.status(400).json('Category is not created. Please Try Again')
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

exports.getCategoryById = async (req, res) => {
    try {
        const getCategory = await Category.findById({ _id: req.params.id });
        if (getCategory) {
            res.status(200).json({ getCategory });
        }
        else {
            res.status(400).json({ errorMessage: 'Category not found. Please try again' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const getCategory = await Category.findById({ _id: req.params.id });
        if (getCategory) {
            getCategory.name = req.body.name;
            getCategory.picture = req.body.picture;
            if (req.body.parentId) {
                getCategory.parentId = req.body.parentId;
            }
            const newCategory = getCategory.save();
            if (newCategory) {
                res.status(200).json({ successMessage: `Category updated successfully` });
            } else {
                res.status(400).json({ errorMessage: 'Category not updated. Please try again' })
            }
        }
        else {
            res.status(400).json({ errorMessage: 'Category not found. Please try again' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const getCategory = await Category.findById({ _id: req.params.id })
        if (getCategory) {
            await cloudinaryCon.uploader?.destroy(getCategory?.picture?.id);
            getCategory.remove();
            res.status(200).json({ successMessage: `Category ${getCategory.name} has been deleted successfully` });
        } else {
            res.status(400).json({ errorMessage: 'Category could not be deleted. Please try again' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}
