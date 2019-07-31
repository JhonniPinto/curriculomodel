const init = db => {
    const camposModel   = require('../models/campos')(db)
    const infosModel    = require('../models/informacoes')(db)
    const contatosModel = require('../models/contatos')(db)
    
    const getCamposEInfos = async() => {
        const allCampos   = await camposModel.allCampos()
        const allInfos    = await infosModel.allInfos()
        const camposEInfos = allCampos.map(campo => {
            return {
                ...campo,
                infos: allInfos.filter(info => campo.id === info.campo_id)
            }
        })
        return camposEInfos
    }

    const index = async(req, res) => {
        const camposEInfos = await getCamposEInfos()
        res.render('index', {camposEInfos, error: false, form: false})
    }
    
    const novoContato = async(req, res) => {
        try {
            const data = req.body
            await contatosModel.novo(data)
            res.redirect('/')
        } catch (err) {
            const camposEInfos = await getCamposEInfos()
            res.render('index', {camposEInfos, error: err.error, form: req.body})
        }
    }
    
    return {
        index,
        novoContato
    }

}
module.exports = init
