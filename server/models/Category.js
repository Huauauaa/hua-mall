module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        arg: true,
        msg: '此类别已经存在',
      },
    },
    description: { type: DataTypes.STRING },
  });

  model.associate = (models) => {
    model.belongsToMany(models.Product, {
      through: models.ProductCategory,
      onDelete: 'CASCADE',
    });
  };

  return model;
};
