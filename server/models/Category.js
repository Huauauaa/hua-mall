module.exports = (sequelize, DataTypes) =>
  sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: { type: DataTypes.STRING },
  });
