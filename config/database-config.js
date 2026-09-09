const dotenv = require('dotenv')
const path = require('../services/server-service').path
const log = require('../log/logging').log

dotenv.config({path: path.resolve('env/.env')})
module.exports = config = {} // declare empty object

class DatabaseConfig {
    constructor() {
        log.silly('DatabaseConfig constructor is using')
    }

    get sequelize() {
        return require('sequelize')
    }

    get sequelizeConfig() {
        return new this.sequelize(
            process.env.SQLL_DATABASE,
            process.env.SQLL_USERNAME,
            process.env.SQLL_PASSWORD,
            {
                /* set different port */
                dialect: 'mysql',
                host: process.env.SQLL_HOST,
                port: process.env.SQLL_PORT,
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                }
            }
        ) // ended new sequelize()
    }
}

//  check config , it was done or not {path: path.resolve('env/.env')})
/**new DatabaseConfig().sequelizeConfig.authenticate().then(() => {
    log.info('connected successfully!!')
}).catch((error) => {
    log.warn('message : failed connect!!')
    throw error
})*/

const configSequel = new DatabaseConfig()
// add object to config
config.sequelizeConfig = configSequel.sequelizeConfig
config.sequelize = configSequel.sequelize
// export config object
module.exports = config
