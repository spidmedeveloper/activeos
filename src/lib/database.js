const mysql = require('mysql')


const ocs = mysql.createPool({
    connectionLimit: 1000,
    host: '10.0.36.239',
    user: 'mastermind',
    password: '.M4st3rm1nd.',
    database: 'ocs_umd'
})

const database = {
    devicesTotal: () => {
        try {
            return new Promise((resolve, reject) => {
                ocs.query("SELECT count(distinct name) as Total FROM hardware", (err, data) => {
                    if (data.length > 0) {
                        return resolve(data)
                    } else {
                        return []
                    }
                })
            })
        } catch (error) {
            console.log('Error Detectado getNewID:', error);
        }
    },
    devicesDuplicates: async () => {
        try {
            return new Promise(async (resolve, reject) => {
                const getAll = await module.exports.devicesTotal();
                ocs.query("SELECT name, COUNT(name) as Total FROM hardware HAVING COUNT(name) > 1", (err, data) => {
                    if (data.length > 0) {
                        return resolve((data[0].Total - getAll[0].Total))
                    } else {
                        return []
                    }
                })
            })
        } catch (error) {
            console.log('Error Detectado getNewID:', error);
        }
    },
    inventoryNow: async () => {
        try {
            return new Promise(async (resolve, reject) => {
                ocs.query("SELECT COUNT(distinct name) AS Total FROM hardware WHERE lastdate LIKE '2022-09-29%'", (err, data) => {
                    if (data.length > 0) {
                        return resolve(data[0].Total)
                    } else {
                        return []
                    }
                })
            })
        } catch (error) {
            console.log('Error Detectado getNewID:', error);
        }
    },
    mayor15D: async () => {
        try {
            return new Promise(async (resolve, reject) => {
                ocs.query("SELECT COUNT(DISTINCT name) AS Total FROM hardware WHERE lastdate <= DATE_SUB('2022-09-29', INTERVAL 15 DAY)", (err, data) => {
                    if (data.length > 0) {
                        return resolve(data[0].Total)
                    } else {
                        return []
                    }
                })
            })
        } catch (error) {
            console.log('Error Detectado getNewID:', error);
        }
    }


}

module.exports = database