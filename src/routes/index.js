const Router = require('express').Router()
const database = require('../lib/database')

Router.get('/', async (req, res) => {
    const getTotal = await database.devicesTotal()
    const getDuplicates = await database.devicesDuplicates()
    const invNow = await database.inventoryNow()
    const mayor15 = await database.mayor15D()
    res.render('index', { getTotal, getDuplicates, invNow, mayor15 })
})

module.exports = Router