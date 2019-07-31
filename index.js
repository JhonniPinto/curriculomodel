const db = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'curriculodb'
    }
})

const app = require('./app')(db)

const port = process.env.PORT || 3000
app.listen(port, err => err ? console.log('ERRO:', err) : console.log('Currículo is connected...'))

