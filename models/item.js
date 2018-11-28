module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    // uid: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true // Automatically gets converted to SERIAL for postgres
    // },
    name: {
      type: DataTypes.STRING
    },
    pic: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    currentUserID: {
      type: DataTypes.INTEGER
    },
    available: {
      type: DataTypes.BOOLEAN
    }
  });
  

  Item.associate = function(models) {
    // We're saying that a User should belong to a Group
    Item.belongsTo(models.User, {foreignKey: 'ownerID'});
  };

  return Item;
};
