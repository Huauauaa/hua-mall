const express = require('express');
const router = express.Router();
const { User: model } = require('../models');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middlewares/authMiddleware');

router.get('/users', async (req, res) => {
  const { pageSize = 5, page } = req.query;
  let limit, offset;
  if (Number(page) && Number(page) > 0) {
    limit = +pageSize;
    offset = (page - 1) * pageSize;
  }
  const users = await model.findAndCountAll({
    attributes: {
      exclude: ['password'],
    },
    limit,
    offset,
    order: [['updatedAt', 'DESC']],
  });
  res.json(users);
});

router.post('/register', async (req, res) => {
  const { password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    await model.create({ ...req.body, password: hashPassword });
    res.status(201).json('success');
  } catch (error) {
    console.error(error);
    res.status(500).json(error.errors.map((item) => item.message).join(' '));
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await model.findOne({
    where: { username },
    raw: true,
  });
  if (!user) {
    return res.status(401).json({ error: '账号或密码错误' });
  }
  const { password: userPassword, ...filterUser } = user;
  const isMatch = await bcrypt.compare(password, userPassword);

  if (isMatch) {
    const accessToken = sign({ user: filterUser }, 'secret');
    res.json(accessToken);
  } else {
    res.status(401).json({ error: '账号或密码错误' });
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    if (password) {
      req.body.password = await bcrypt.hash(password, 10);
    }
    const result = await model.update(req.body, {
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
router.post('/users', async (req, res) => {
  try {
    const { password, ...other } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await model.create({ ...other, password: hashPassword });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.errors.map((item) => item.message).join(' '));
  }
});

router.delete('/users/:id', async (req, res) => {
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

router.get('/currentUser', validateToken, async (req, res) => {
  const userId = req.user.id;
  const user = await model.findByPk(userId, {
    attributes: { exclude: ['password'] },
  });
  res.json(user);
});

router.put('/updatePassword/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const { password, newPassword } = req.body;

  const user = await model.findByPk(id);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: '密码错误' });
  }
  const hashPassword = await bcrypt.hash(newPassword, 10);
  await model.update({ password: hashPassword }, { where: { id } });
  res.json('更新成功');
});

module.exports = router;
