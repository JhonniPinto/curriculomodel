const init = db => {

    const Joi = require('@hapi/joi')
    const validationSchema = Joi.object().keys({
        nome: Joi.string().min(3).max(50).required(),
        path: Joi.string().empty(''),
        campo_id: Joi.string().required()
    })
    const JoiValidation = require('../utils/joiValidation')
    

    const allInfos = () => db('informacoes').select('*')
    
    const info = (id) => db('informacoes').select('*').where({id: id})
    
    const excluirUm = (id) => db('informacoes').del().where({id: id})
    
    const nova = async(data) => {
        const value = JoiValidation.validate(data, validationSchema)
        await db('informacoes').insert({
            nome: value.nome,
            path: data.path,
            campo_id: value.campo_id
        })
    }
    
    const editar = async(data, id) => {
        const value = JoiValidation.validate(data, validationSchema)
        await db('informacoes').update({
            nome: value.nome,
            path: data.path,
            campo_id: value.campo_id
        }).where({id: id})
    }
    
    
    return {
        allInfos,
        info,
        excluirUm,
        nova,
        editar
    }
}

module.exports = init