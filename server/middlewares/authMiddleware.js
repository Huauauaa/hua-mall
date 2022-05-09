const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const accessToken = req.header('accessToken');

  if (!accessToken) {
    return res.status(401).json({ error: '未登录' });
  }

  try {
    const validToken = verify(accessToken, 'secret');
    req.user = validToken.user;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

module.exports = { validateToken };
