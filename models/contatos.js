const init = db => {

    const Joi = require('@hapi/joi')
    const validationSchema = Joi.object().keys({
        nome: Joi.string().min(5),
        email: Joi.string().email(),
        assunto: Joi.string().min(5)
    })
    const JoiValidation = require('../utils/joiValidation')

    const allContatos = () => db('contatos').select('*')
    
    const novo = async(data) => {
        const values = JoiValidation.validate(data, validationSchema)
        await db('contatos').insert(values)
    }
    
    const excluirUm = (id) => db('contatos').del().where({id: id})
    
    return {
        allContatos,
        excluirUm,
        novo
    }
}

module.exports = init