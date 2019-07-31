const init = db => {
    const passport       = require('passport')
    const LocalStrategy  = require('passport-local')
    
    const usuarioModel   = require('../models/usuario')(db)
    const bcrypters      = require('./bcrypters')
    
    passport.use(new LocalStrategy(async(username, password, done) => {
        const usuario = await usuarioModel.usuario(username)
        if (usuario[0]) {
            const isValid = await bcrypters.passCompare(password, usuario[0].password)
            if (isValid) {
                return done(null, usuario)
            } else {
                return done(null, false)
            }
        } else {
            return done(null, false)
        }
    }))
    
    passport.serializeUser((user, done) => {
        done(null, user)
    })
    passport.deserializeUser((user, done) => {
        done(null, user)
    })

    return passport
}

module.exports = init