const express = require('express');
const app = express();
const PREFIX = '/api';
const port = 3000;
app.use(express.json());

const db = require('./models');

const routers = [
  { path: '/products', file: require('./routers/products') },
  { path: '/orders', file: require('./routers/orders') },
  { path: '/auth', file: require('./routers/users') },
  { path: '/categories', file: require('./routers/category') },
  { path: '/cart', file: require('./routers/cart') },
];

routers.forEach((item) => {
  app.use(`${PREFIX}${item.path}`, item.file);
});

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.info(`Example app listening on port ${port}`);
  });
});
