const CartModel = require("../models/cartModel");
const ProductModel = require("../models/productModel");

exports.cartTest = async (req, res) => {
  console.log("Cart Routes Working");
  res.status(200).json({ message: "Cart Routes Working Good" });
};

exports.addToCart = async (req, res) => {
  try {
    const cart = await CartModel.find();

    // if (cart) {
    //   return res.status(201).json({ message: "cart is available" });
    // }

    const id = req.params.id;

    const product = await ProductModel.findById(id);

    const { cartQty, cartProductPrice } = req.body;
    const newCart = {
      productName: product.productName,
      productImage: product.productImage,
      cartQty: cartQty,
      cartProductPrice: cartQty * product.productPrice,
    };

    // cart.products.push(newCart);

    await cart.save(newCart);
    console.log(cart);
    return res.status(200).json({
      message: "Add to cart",
      status: true,
      product: product,
      Cart: cart,
    });
  } catch (error) {
    return res.status(500).json({ message: "server error", error });
  }
};
