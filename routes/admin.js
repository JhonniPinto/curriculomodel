const init = (db) => {
    const router          = require('express').Router()
    const adminController = require('../controllers/admin')(db)
    const camposRoutes    = require('./campo')
    const infosRoutes     = require('./informacoes')

    router.use(adminController.restricao)

    router.get('/contato/apagar/:id', adminController.excluirContato)
    router.get('/', adminController.index)
    router.use('/campo', camposRoutes(db))
    router.use('/informacao', infosRoutes(db))

    return router
}

module.exports = init