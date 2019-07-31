const init = db => {
    const router          = require('express').Router()
    const pagesController = require('../controllers/pages')(db)

    router.get('/', pagesController.index)
    router.post('/contato', pagesController.novoContato)

    return router
}

module.exports = init