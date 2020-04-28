const express = require("express");

const router = express.Router();

//Receive a POST request to add aan item to cart
router.post("/cart/products", (req, res) => {
  console.log(req.body.productID);

  res.send("Product added to cart");
});

// Receive a GET request to show all items in cart

// Receive a POST request to delete an item from a cart

module.exports = router;
