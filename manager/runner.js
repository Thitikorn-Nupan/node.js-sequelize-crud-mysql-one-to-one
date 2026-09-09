const log = require('../log/logging').log
const runner = require('../services/server-service').buildApp.express()
const routers = require('../routering/routers')

runner.use('/api/employee' , routers.routerEmployee)
runner.use('/api/login' , routers.routerLogin)

runner.listen(8080,(errors) => {
    if (errors) throw errors
    else log.info(`You're in port 8080`)
})