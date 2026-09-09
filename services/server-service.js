module.exports = serviceServer = {} // declare serviceServer object for exporting methods

class ServerService {
    get path () {
        return require('path')
    }
    get buildApp () {
        return {
            /* return object */
            express : require('express') ,
            bodyParser : require('body-parser')
        }
    }
}

const service = new ServerService() // create object because I did build method and need to use outside class
// add method to obj
serviceServer.path = service.path
serviceServer.buildApp = service.buildApp
module.exports = serviceServer

