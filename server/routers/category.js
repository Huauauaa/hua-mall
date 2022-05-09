const express = require('express');
const router = express.Router();
const { Category: model } = require('../models');

router.get('/', async (req, res) => {
  const result = await model.findAll();
  res.json(result);
});

router.post('/', async (req, res) => {
  const result = await model.create(req.body);
  res.status(201).send(result);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await model.update(req.body, { where: { id } });
  res.json(result);
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
    res.status(500).json(error.errors.map((item) => item.message).join(' '));
  }
});

module.exports = router;
