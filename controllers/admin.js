const init = db => {
    const camposModel   = require('../models/campos')(db)
    const infosModel    = require('../models/informacoes')(db)
    const contatosModel = require('../models/contatos')(db)
    
    const restricao = (req, res, next) => {
        req.isAuthenticated() ? next() : res.redirect('/')
    }
    
    const index = async(req, res) => {
        const allCampos    = await camposModel.allCampos()
        const allInfos     = await infosModel.allInfos()
        const allContatos  = await contatosModel.allContatos()
        const camposEInfos = allCampos.map(campo => {
            return {
                ...campo,
                infos: allInfos.filter(info => campo.id === info.campo_id)
            }
        })
        res.render('admin/index', {
            camposEInfos,
            allContatos
        })
    }
    
    const excluirContato = async(req, res) => {
        const id = req.params.id
        await contatosModel.excluirUm(id)
        res.redirect('/admin')
    }

    return {
        index, 
        restricao,
        excluirContato
    }
}
module.exports = init
