const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Product: model } = require('../models');

router.get('/', async (req, res) => {
  const { name, pageSize = 5, page = 1, categoryId } = req.query;
  const where = {};
  if (name) {
    where.name = { [Op.substring]: name };
  }
  if (categoryId) {
    where.categoryId = categoryId;
  }
  const result = await model.findAndCountAll({
    where,
    limit: +pageSize,
    offset: (page - 1) * pageSize,
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
    res.json(result);
  } catch (error) {
    console.error(error);
    res.json(error.errors.map((item) => item.message).join(' '));
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await model.update(req.body, {
      where: {
        id,
      },
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.json(error.errors.map((item) => item.message).join(' '));
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await model.destroy({
      where: {
        id,
      },
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.json(error.errors.map((item) => item.message).join(' '));
  }
});

module.exports = router;
