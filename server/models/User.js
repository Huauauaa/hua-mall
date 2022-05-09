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
  });

  model.associate = (models) => {
    model.belongsToMany(models.Product, {
      through: models.Cart,
    });
  };

  return model;
};
