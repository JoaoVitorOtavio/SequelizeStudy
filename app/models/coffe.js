'use strict';
module.exports = (sequelize, DataTypes) => {
  const Coffe = sequelize.define('Coffe', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    // shopId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'Shop',
    //     key: 'id'
    //   }
    // }
  }, {});

  // Coffe.HasOne(models.shop);

  Coffe.associate = function (models) {
    console.log(models)
    Coffe.belongsTo(models.Shop,{as:'Shop' ,foreignKey:'ShopId'});
  };


  return Coffe;
};

// sequelize model:create --name User --attributes 'name:string email:string bio:text'