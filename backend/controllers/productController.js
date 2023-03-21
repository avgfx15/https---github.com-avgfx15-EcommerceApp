const SellerModel = require("../models/sellerModel");
const ProductModel = require("../models/productModel");

// ` Testing Route
exports.productTestRoute = async (req, res) => {
  const products = await ProductModel.find();
  console.log(products);
  return res.status(200).json({ products: products });
};

// ` Add New Product Route
exports.addNewProduct = async (req, res) => {
  try {
    /// Destructure Req data frontend
    const {
      productName,
      productQty,
      productCategory,
      productColor,
      productPrice,
      productImage,
      productDescription,
    } = req.body;

    /// Find if Product name already exist or not
    const product = await ProductModel.findOne({ productName: productName });
    /// If Product Name already exist then send response to frontend
    if (product) {
      return res.status(202).json({
        message: "Product Already exist, Please add Qty",
        status: false,
      });
    }
    /// If Product Name Not exist then save as newproduct and send response to frontend
    const newProduct = new ProductModel({
      productName: productName,
      productQty: productQty,
      productCategory: productCategory,
      productColor: productColor,
      productPrice: productPrice,
      productImage: productImage,
      productDescription: productDescription,
    });

    const savedProduct = await newProduct.save();
    return res.status(201).json({
      message: "Product Saved Successfully",
      status: true,
      product: savedProduct,
    });
  } catch (error) {
    /// If any server error send response to frontend
    return res
      .status(500)
      .json({ message: "Server Error", status: false, error });
  }
};

//` Get All Products Route
exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await ProductModel.find();

    /// If All Products are not available then send response to frontend
    if (!allProducts) {
      return res.status(201).json({
        message:
          "Not a single product available, Kindly please add Product first",
        status: false,
      });
    }
    return res.status(200).json({
      message: "Display all products",
      status: true,
      products: allProducts,
    });
  } catch (error) {
    /// If any server error send response to frontend
    return res
      .status(500)
      .json({ message: "Server Error", status: false, error });
  }
};

//` Get Product By Id

exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await ProductModel.findById(id);

    /// If Product is not available then send error response to frontend
    if (!product || product == null) {
      return res.status(201).json({
        message:
          "Not a single product available, Kindly please add Product first",
        status: false,
      });
    }

    /// If Product is available then send response to frontend
    return res.status(200).json(product);
  } catch (error) {
    /// If any server error send response to frontend
    return res
      .status(500)
      .json({ message: "Server Error", status: false, error });
  }
};

//` Delete Product from list

exports.deleteProductById = async (req, res) => {
  try {
    const id = req.params.id;
    /// Try to Find Product By Id and Delete
    const product = await ProductModel.findByIdAndDelete(id);

    /// If Product is not available then send error response to frontend
    if (!product || product == null) {
      return res
        .status(201)
        .json({ message: "Product not available", status: false });
    }

    /// If Product is Deleted Successfully then send response to frontend
    return res
      .status(200)
      .json({ message: "Product Deleted Successfully", status: true });
  } catch (error) {
    /// If any server error send response to frontend
    return res
      .status(500)
      .json({ message: "Server Error", status: false, error });
  }
};

//` Update Product By Id

exports.updateProductById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    /// Find Procuct By Id
    const product = await ProductModel.findById(id);

    /// If Product is not available then send error response to frontend
    if (!product || product == null) {
      return res
        .status(201)
        .json({ message: "Product not available", status: false });
    }

    /// If Product is available then send response to frontend

    /// Get Data from Frontend
    const {
      productName,
      productQty,
      productCategory,
      productColor,
      productPrice,
      productImage,
      productDescription,
    } = req.body;

    /// Update Product and Save then Send response to frontend
    const updateProduct = await ProductModel.findByIdAndUpdate(
      id,
      {
        $set: {
          productName: productName,
          productQty: productQty,
          productCategory: productCategory,
          productColor: productColor,
          productPrice: productPrice,
          productImage: productImage,
          productDescription: productDescription,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Product Updated Successfully",
      status: true,
      product: updateProduct,
    });
  } catch (error) {
    /// If any server error send response to frontend
    return res
      .status(500)
      .json({ message: "Server Error", status: false, error });
  }
};

//` Latest Products Route
exports.latestProducts = async (req, res) => {
  try {
    /// Try to find latestProducts by sort createAt and limit for display
    const latestProducts = await ProductModel.find()
      .sort({
        createdAt: -1,
      })
      .limit(4);
    /// If Products are not available then send error response to frontend
    if (!latestProducts) {
      return res
        .status(201)
        .json({ message: "No Product Available", status: false });
    }

    /// If latestProduct are available then send response to frontend
    return res
      .status(200)
      .json({ latestProducts: latestProducts, status: true });
  } catch (error) {
    /// If any server error send response to frontend
    return res
      .status(500)
      .json({ message: "Server Error", status: false, error });
  }
};

//` Trendy Products

exports.trendyProducts = async (req, res) => {
  try {
    /// Try to find latestProducts by sort createAt and limit for display
    const trendyProducts = await ProductModel.find()
      .sort({
        createdAt: -1,
      })
      .limit(8);
    /// If Products are not available then send error response to frontend
    if (!trendyProducts) {
      return res
        .status(201)
        .json({ message: "No Product Available", status: false });
    }

    /// If latestProduct are available then send response to frontend
    return res
      .status(200)
      .json({ trendyProducts: trendyProducts, status: true });
  } catch (error) {
    /// If any server error send response to frontend
    return res
      .status(500)
      .json({ message: "Server Error", status: false, error });
  }
};

exports.querySelector = async (req, res) => {
  try {
    /// Query Comes from frontend
    const { text } = req.params;
    /// Transform Query text in to First letter Capitalize
    const searchText = text.charAt(0).toUpperCase() + text.slice(1);

    /// Find Porducts With MongoDb $or Operate where any One Condition must be true
    const products = await ProductModel.find({
      $or: [
        { productCategory: searchText },
        { productName: searchText },
        { productColor: searchText },
        { productPrice: searchText },
      ],
    });
    /// If Products are not available then send error response to frontend
    if (products.length < 1) {
      return res
        .status(201)
        .json({ message: "No Such Products Available", status: false });
    }

    /// If products are available then send response to frontend
    return res.status(200).json({ Products: products, status: true });
  } catch (error) {
    /// If any server error send response to frontend
    return res
      .status(500)
      .json({ message: "Server Error", status: false, error });
  }
};
