const init = db => {
    const router = require('express').Router()

    const authRoutes  = require('./autenticacao')
    const pagesRoutes = require('./pages')
    const adminRoutes = require('./admin') 

    router.use('/', authRoutes(db))
    router.use('/', pagesRoutes(db))
    router.use('/admin', adminRoutes(db))

    return router
}
module.exports = init