const {createLogger} = require('../log/logging-v2')
const path = require('../services/server-service').path
const runner = require('../services/server-service').buildApp.express()
const routers = require('../routering/routers')

const filename = path.basename(__filename);
const log = createLogger(filename);

runner.use('/api/employee' , routers.routerEmployee)
runner.use('/api/login' , routers.routerLogin)

runner.listen(8080,(errors) => {
    if (errors) throw errors
    else log.info(`You're in port 8080`)
})