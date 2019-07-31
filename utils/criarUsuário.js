const init = db => {
    const usuarioModel = require('../models/usuario')(db)
    const bcrypters      = require('./bcrypters')
    
    const criarUsuario = async() => {
        const usuarios = await usuarioModel.todos()
        if ( usuarios[0].total === 0) {
            const usuario = {
                username: 'Jhonni',
                password: await bcrypters.genHash('abc123')
            } 
            await usuarioModel.novo(usuario)
            console.log('Usuário criado')
        }
    }

    return criarUsuario
}
module.exports = init
