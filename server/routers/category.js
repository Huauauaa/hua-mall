const express = require('express');
const router = express.Router();
const { Category: model } = require('../models');

router.get('/', async (req, res) => {
  const result = await model.findAll();
  res.json(result);
});

module.exports = router;
