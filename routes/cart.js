const express = require("express");
const cartsRepo = require("../repository/carts");

const router = express.Router();

//Receive a POST request to add aan item to cart
router.post("/cart/products", async (req, res) => {
  // Figure out the card
  let cart;
  if (!req.session.cartId) {
    //we dont have a cart, we need to create one,
    //and store the cart id to the req.session.cartID
    //property
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    // we have a cart! Let get it from the repository
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  const existingItem = cart.items.find(item => item.id === req.body.productID);
  if (existingItem) {
    // increment quantity and save cart
    existingItem.quantity++;
  } else {
    // add new product id to items array
    cart.items.push({ id: req.body.productID, quantity: 1 });
  }

  await cartsRepo.update(cart.id, {
    items: cart.items
  });

  res.send("Product added to cart");
});

// Receive a GET request to show all items in cart

// Receive a POST request to delete an item from a cart

module.exports = router;
