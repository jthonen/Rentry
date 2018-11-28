module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // uid: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true // Automatically gets converted to SERIAL for postgres
    // },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    passHash: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    }
  });

  User.associate = function(models) {
    // We're saying that a User should belong to a Group
    User.belongsTo(models.Group);
  };
  return User;
};