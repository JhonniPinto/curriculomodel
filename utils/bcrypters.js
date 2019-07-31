const bcrypt     = require('bcryptjs')

const genHash = async(senha) => {
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(senha, salt)
    return hash
}

const passCompare = async(senha, senhaDb) => {
    return await bcrypt.compare(senha, senhaDb)
}

module.exports = {
    genHash,
    passCompare
}