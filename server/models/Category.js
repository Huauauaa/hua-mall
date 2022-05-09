module.exports = (sequelize, DataTypes) =>
  sequelize.define('Category', {
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
