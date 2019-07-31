const Joi = require('@hapi/joi')

const validatonError = (message, error) => ({
    message, error
})

const validate = (data, schema) => {
    const { error , value } = Joi.validate(data, schema, { abortEarly: false , stripUnknown: true})
    if (error) {
        throw validatonError('Erro de validação', error.details.map(item => item.path[0])) 
    } else {
        return value
    }
}

module.exports = {validate}