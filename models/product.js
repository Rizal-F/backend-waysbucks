'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // product belongsTo product
      product.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "idUser",
        },
      });
    }
  }
  product.init({
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};