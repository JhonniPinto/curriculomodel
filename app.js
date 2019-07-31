const init = db => {
    const express    = require('express')
    const path       = require('path')
    const app        = express()
    const bodyParser = require('body-parser')
    const session    = require('express-session')

    const indexRoutes = require('./routes/index')

    const usuarioInicial = require('./utils/criarUsuário')
    usuarioInicial(db)

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static(path.join(__dirname, 'public')))
    app.use(session({ secret:'JayP', name:'Id', resave: true, saveUninitialized: true}))

    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'ejs')

    app.use('/', indexRoutes(db))

    return app
}
module.exports = init