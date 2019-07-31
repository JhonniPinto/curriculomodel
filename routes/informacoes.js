const init = (db) => {
    const router          = require('express').Router()
    const infosController = require('../controllers/informacoes')(db)

    router.get('/nova', infosController.novaForm)
    router.post('/nova', infosController.novaProcess)

    router.get('/excluir/:id', infosController.excluirUm)

    router.get('/editar/:id', infosController.editarForm)
    router.post('/editar/:id', infosController.editarProcess)

    return router
}

module.exports = init