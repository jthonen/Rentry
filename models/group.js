module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define("Group", {
    // uid: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true // Automatically gets converted to SERIAL for postgres
    // },
    name: {
      type: DataTypes.STRING
    }
  });
  return Group;
};
