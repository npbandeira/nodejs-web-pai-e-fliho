const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

const Perfil = sequelize.define({
  perfilName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  perfil_type: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Perfil;
