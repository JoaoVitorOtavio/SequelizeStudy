'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define('Shop', {
    name: DataTypes.STRING
  }, {});
  Shop.associate = models => {
    // associations can be defined here
    // Shop hasMany Coffes
     Shop.BelongsToMany(models.coffe, {
       through: models.coffe,
       as: 'coffe',
       foreignKey: 'shopId'
     })

  };
  return Shop;
};