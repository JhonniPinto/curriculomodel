const init = db => {
    const camposModel = require('../models/campos')(db)
    
    const novoForm = (req, res) => res.render('admin/campo/novo', {error: false, form: false})
    const novoProcess = async(req, res) => {
        try {
            const data = req.body
            await camposModel.novo(data)
            res.redirect('/admin')
        } catch (err) {
            res.render('admin/campo/novo', {error: err.error, form: req.body})
        }
    }
    
    const excluirUm = async(req, res) => {
        const id = req.params.id
        await camposModel.excluirUm(id)
        res.redirect('/admin')
    }
    
    const editarForm = async(req, res) => {
        const id    = req.params.id
        const campo = await camposModel.campo(id)
        res.render('admin/campo/editar', {campo: campo[0], error: false})
    }
    const editarProcess = async(req, res) => {
        try {
            const id    = req.params.id
            const data  = req.body
            await camposModel.editar(data, id)
            res.redirect('/admin')
        } catch (err) {
            res.render('admin/campo/editar', {campo: req.body, error: err.error} )
        }
    }
    
    return {
        novoForm,
        novoProcess,
        excluirUm,
        editarForm,
        editarProcess
    }

}
module.exports = init