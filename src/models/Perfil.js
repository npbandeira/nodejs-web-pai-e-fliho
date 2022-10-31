const { DataTypes, Model} = require("sequelize"); 

class Perfil extends Model {
  static init(sequelize) {
    super.init(

      {
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        tipo: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        }
        
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Perfil;
