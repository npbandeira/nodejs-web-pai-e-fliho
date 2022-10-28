const Perfil = require('../models/Perfil')

module.exports = {
    async store(req, res, next) {

        let dados = req.body
        console.log(dados)
        Perfil.create(dados).then({()=>{

            }
        })
      },
}