const { Model, DataTypes } = require('sequelize');

class Perfil extends Model {
  static init(sequelize) {
    super.init({
      perfilname: DataTypes.STRING,
      perfil_type: DataTypes.STRING,
    }, {
      sequelize
    })
  }
}

module.exports = User;