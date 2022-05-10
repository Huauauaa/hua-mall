const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Product: model, Category, ProductCategory } = require('../models');

router.get('/', async (req, res) => {
  const { name, pageSize = 5, page, categoryId } = req.query;
  const where = {};
  if (name) {
    where.name = { [Op.substring]: name };
  }
  if (categoryId) {
    where.categoryId = categoryId;
  }
  let limit, offset;
  if (Number(page) && Number(page) > 0) {
    limit = +pageSize;
    offset = (page - 1) * pageSize;
  }
  const result = await model.findAndCountAll({
    where,
    limit,
    offset,
    order: [['updatedAt', 'DESC']],
    include: Category,
  });
  res.json(result);
});

router.get('/all', async (req, res) => {
  const result = await model.findAll({ attributes: ['id', 'name'] });
  res.json(result);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await model.findByPk(id);
  res.json(result);
});

router.post('/', async (req, res) => {
  try {
    const result = await model.create(req.body);
    const { categoryIds } = req.body;
    const categories = await Category.findAll({
      where: { id: { [Op.in]: categoryIds } },
    });
    await result.setCategories(categories || []);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.errors.map((item) => item.message).join(' '));
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryIds, name } = req.body;
    const result = await model.findByPk(id);
    result.name = name;
    await result.save();
    const categories = await Category.findAll({
      where: { id: { [Op.in]: categoryIds } },
    });
    await result.setCategories(categories || []);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.errors.map((item) => item.message).join(' '));
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await model.findByPk(id);
    result.setCategories([]);
    await result.destroy();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.errors.map((item) => item.message).join(' '));
  }
});

module.exports = router;
