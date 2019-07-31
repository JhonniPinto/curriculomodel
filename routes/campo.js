const init = db => {
    const router = require('express').Router()
    const camposController = require('../controllers/campos')(db)

    router.get('/novo', camposController.novoForm)
    router.post('/novo', camposController.novoProcess)

    router.get('/excluir/:id', camposController.excluirUm)

    router.get('/editar/:id', camposController.editarForm)
    router.post('/editar/:id', camposController.editarProcess)

    return router
}

module.exports = init