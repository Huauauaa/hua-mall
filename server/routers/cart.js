const express = require('express');
const router = express.Router();
const { validateToken } = require('../middlewares/authMiddleware');
const { Product, User, Cart } = require('../models');

router.post('/', validateToken, async (req, res) => {
  const { productId, count = 1 } = req.body;
  const userId = req.user.id;
  const product = await Product.findByPk(productId);
  const user = await User.findByPk(userId);
  const cart = await Cart.findOne({ where: { productId, userId } });
  if (cart) {
    await Cart.update({ count: cart.count + 1 }, { where: { id: cart.id } });
  } else {
    await Cart.create({ count, ProductId: productId, UserId: userId });
  }

  res.json('success');
});

router.put('/', validateToken, async (req, res) => {
  const { productId, count } = req.body;
  const userId = req.user.id;
  const cart = await Cart.findOne({ where: { productId, userId } });
  await Cart.update({ count }, { where: { id: cart.id } });

  res.json('success');
});

router.get('/', validateToken, async (req, res) => {
  const userId = req.user.id;
  const user = await User.findByPk(userId);
  const result = await user.getProducts();
  res.json(result);
});

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const user = await User.findByPk(userId);
  const product = await Product.findByPk(id);
  const result = await user.removeProduct(product);
  res.json(result);
});

module.exports = router;
