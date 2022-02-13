'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // user has one profile
      user.hasOne(models.profile, {
        as: "profile",
        foreignKey: {
          name: "idUser",
        },
      });
      // user has many product
      user.hasMany(models.product, {
        as: "products",
        foreignKey: {
          name: "idUser",
        },
      });
      user.hasMany(models.topping, {
        as: "toppings",
        foreignKey: {
          name: "idUser",
        },
      });
    }
  }
  user.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};