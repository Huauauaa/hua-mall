module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        arg: true,
        msg: '此商品已经存在',
      },
      validate: {
        notNull: {
          msg: '名称不能为空',
        },
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: '0.00',
    },
    moneyUnit: {
      type: DataTypes.STRING,
      defaultValue: '元',
    },
    unit: { type: DataTypes.STRING, defaultValue: '个' },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
  });

  model.associate = (models) => {
    model.belongsToMany(models.User, {
      through: models.Cart,
    });

    model.belongsToMany(models.Category, {
      through: models.ProductCategory,
    });

    model.belongsToMany(models.Order, {
      through: models.ProductOrder,
    });
  };

  return model;
};
