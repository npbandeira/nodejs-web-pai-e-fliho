const { Model, DataTypes } = require("sequelize");

class Perfil extends Model {
  static init(sequelize) {
    super.init(
      {
        perfilName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        perfil_type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Perfil;
