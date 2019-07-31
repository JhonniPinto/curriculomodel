const init = db => {
    const camposModel = require('../models/campos')(db)
    const infosModel  = require('../models/informacoes')(db)
    
    const novaForm = async(req, res) => {
        const allCampos = await camposModel.allCampos()
        res.render('admin/informacoes/nova', {allCampos, form: false, error: false})
    }
    const novaProcess = async(req, res) => {
        try {
            const data = req.body
            await infosModel.nova(data)
            res.redirect('/admin')
        } catch (err) {
            const allCampos = await camposModel.allCampos()
            res.render('admin/informacoes/nova', {allCampos, form: req.body, error: err.error})
        }
    }
    
    const excluirUm = async(req, res) => {
        const id = req.params.id
        await infosModel.excluirUm(id)
        res.redirect('/admin')
    }
    
    const editarForm = async(req, res) => {
        const id   = req.params.id
        const info = await infosModel.info(id)
        const allCampos = await camposModel.allCampos()
        res.render('admin/informacoes/editar', {
            form: info[0],
            error: false,
            allCampos
        })
    }
    const editarProcess = async(req, res) => {
        try {
            const id = req.params.id
            const data = req.body
            await infosModel.editar(data, id)
            res.redirect('/admin')
        } catch (err) {
            const allCampos = await camposModel.allCampos()
            res.render('admin/informacoes/editar', { form: req.body, error: err.error, allCampos })
        }
    }
    
    return {
        novaForm,
        novaProcess,
        excluirUm,
        editarForm,
        editarProcess
    }

}

module.exports = init