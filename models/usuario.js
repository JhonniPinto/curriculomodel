const init = db => {
    const todos = () => db('usuario').select('*').count('id as total')
    
    const usuario = (username) => db('usuario').select('*').where({username: username})
    
    const novo = (usuario) => db('usuario').insert({
        username: usuario.username,
        password: usuario.password
    })
    
    
    return {
        todos,
        usuario,
        novo
    }
}
module.exports = init