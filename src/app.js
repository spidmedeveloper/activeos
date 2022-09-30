const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')
const { create } = require('express-handlebars')


dotenv.config('dev')

const app = express()
app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const hbs = create({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: path.join(__dirname, '/views/partials'),
    layoutsDir: path.join(__dirname, '/views/layouts'),
    helpers: require('./lib/funciones'),
    helpers: require('./lib/componentes'),
})

app.use(express.static(__dirname + '/public'))
app.set('views', path.join(__dirname, 'views'))
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.set('port', process.env.PORT)
app.set('ip', process.env.IP)

app.use('/', require('./routes/index'))
app.use('/js', express.static(__dirname + '../../node_modules/jquery/dist'))
app.use('/js', express.static(__dirname + '../../node_modules/bootstrap/dist/js'))
app.use('/js', express.static(__dirname + '../../node_modules/@fortawesome/fontawesome-free/js'))
app.use("/css", express.static(__dirname + "../../node_modules/bootstrap/dist/css"))
app.use('/css', express.static(__dirname + '../../node_modules/@fortawesome/fontawesome-free/css'))
app.use('/table', express.static(__dirname + '../../node_modules/bootstrap-table/dist'))
app.use('/webfonts', express.static(__dirname + '../../node_modules/@fortawesome/fontawesome-free/webfonts'))

app.listen(app.get('port'), app.get('ip'))
