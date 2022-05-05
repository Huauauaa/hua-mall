const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const db = require('./models');

const productRouter = require('./routers/products');
const orderRouter = require('./routers/orders');
const userRouter = require('./routers/users');
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/users', userRouter);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
