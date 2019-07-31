    const init = db => {

    const Joi = require('@hapi/joi')
    const validationSchema = Joi.object().keys({
        nome: Joi.string().min(5).required(),
        icone: Joi.string().min(5).required()
    })
    const JoiValidation = require('../utils/joiValidation')


    const allCampos = () => db('campos').select('*')
    
    const campo = (id) => db('campos').select('*').where({id: id})
    
    const excluirUm = (id) => db('campos').del().where({id: id})
    
    const novo = async(data) => {
        const values = JoiValidation.validate(data, validationSchema)
        await db('campos').insert(values)
    }
    
    const editar = async(data, id) => {
        const values = JoiValidation.validate(data, validationSchema)
        await db('campos').update(values).where({id: id}) 
    }
    
    return {
        allCampos,
        campo,
        excluirUm,
        novo,
        editar
    }
}

module.exports = init