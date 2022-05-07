const express = require('express');
const app = express();
const PREFIX = '/api';
const port = 3000;
app.use(express.json());

const db = require('./models');

const productRouter = require('./routers/products');
const orderRouter = require('./routers/orders');
const userRouter = require('./routers/users');
const categoryRouter = require('./routers/category');
app.use(`${PREFIX}/products`, productRouter);
app.use(`${PREFIX}/orders`, orderRouter);
app.use(`${PREFIX}/users`, userRouter);
app.use(`${PREFIX}/categories`, categoryRouter);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
