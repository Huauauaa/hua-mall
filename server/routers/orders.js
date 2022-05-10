const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { validateToken } = require('../middlewares/authMiddleware');
const { Product, User, Order } = require('../models');

router.post('/', validateToken, async (req, res) => {
  const { totalAmount, productIds } = req.body;
  const order = await Order.create({ totalAmount });
  const products = await Product.findAll({
    where: { id: { [Op.in]: productIds } },
  });
  order.addProducts(products);

  const userId = req.user.id;
  const user = await User.findByPk(userId);
  order.setUser(user);
  if (totalAmount > user.balance) {
    return res.status(400).json({ error: '余额不足' });
  }
  user.balance = user.balance - totalAmount;
  await user.save();
  order.paid = true;
  await order.save();
  res.json(order);
});

router.get('/', validateToken, async (req, res) => {
  const userId = req.user.id;
  const orders = await Order.findAll({
    where: { UserId: userId },
    include: Product,
    order: [['updatedAt', 'DESC']],
  });
  return res.json(orders);
});

module.exports = router;
