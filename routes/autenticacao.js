const init = (db) => {
    const router         = require('express').Router()

    const authController = require('../controllers/autenticacao')
    const passport       = require('../utils/authStrategy')(db)

    router.use(passport.initialize())    
    router.use(passport.session())

    router.use(authController.usuarioToView)
    
    router.get('/login', authController.loginForm)
    router.post('/login', authController.loginProcess(passport))

    router.get('/logout', authController.logout)


    return router
}

module.exports = init