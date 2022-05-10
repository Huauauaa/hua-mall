module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Order', {
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  model.associate = (models) => {
    model.belongsTo(models.User);
    model.belongsToMany(models.Product, {
      through: models.ProductOrder,
      onDelete: 'CASCADE',
    });
  };

  return model;
};
