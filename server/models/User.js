module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        arg: true,
        msg: '不能重复',
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(11),
    },
    gender: {
      type: DataTypes.BOOLEAN,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
  });

  model.associate = (models) => {
    model.belongsToMany(models.Product, {
      through: models.Cart,
    });

    model.hasMany(models.Order);
  };

  return model;
};
