const log = require('../log/logging').log

const myException = require('../exception/custom-exception') // get handler exception
const serverService = require('../service/server-service')
const crudEmployeeService = require('../crud/crud-service').crudEmployee // get object class crud
const crudLoginService = require('../crud/crud-service').crudLogin // get object class crud

// create routering
const routerEmployee = serverService.buildApp.express.Router()
const routerLogin = serverService.buildApp.express.Router()

// set meddler ware
const bodyParser = serverService.buildApp.bodyParser
routerEmployee.use(bodyParser.json())
routerEmployee.use(bodyParser.urlencoded({extended:true}))
routerLogin.use(bodyParser.json())
routerLogin.use(bodyParser.urlencoded({extended:true}))


routerEmployee.get('/reads' , async (req,res) => {
    try {
        await crudEmployeeService.reads().then((result) => {
            return res.status(202).json({
                status: "accepted",
                data: result
            })
        }).catch((e) => {
            log.warn(`cause from reads() method await : ${e.message}`)
            throw e
        })
    } catch (e) {
        log.warn(`cause from routerEmployee get async method (reads) : ${e.message}`)
        throw e
    }
})

routerEmployee.get('/read/(:eid)' , async (req,res) => {
    try {
        await crudEmployeeService.read(req.params['eid']).then((result) => {
            return res.status(202).json({
                status: "accepted",
                data: result
            })
        }).catch((e) => {
            log.warn(`cause from read(eid) method await : ${e.message}`)
            throw e
        })
    } catch (e) {
        log.warn(`cause from routerEmployee get async method (read) : ${e.message}`)
        throw e
    }
})

routerEmployee.post('/create' , async (req,res) => {
    try {
        const {fullname ,age} = req.body
        await crudEmployeeService.create(fullname,age).then((result) => {
            return res.status(201).json({
                status: "create",
                data: result
            })
        }).catch((e) => {
            log.warn(`cause from create(fullname,age) method await : ${e.message}`)
            throw e
        })
    } catch (e) {
        res.status(405).json({
            status:'method not allowed',
            message : `cause from routerEmployee post async method (create) : ${e.message}`
        })
        throw myException.handlerException(`cause from routerEmployee post async method (create) : ${e.message}`) /* when find the exception == ended process*/
    }
})

routerEmployee.put('/update/(:eid)' , async (req,res) => {
    try {
        const {fullname ,age} = req.body
        await crudEmployeeService.update(req.params['eid'],fullname,age).then((result) => {
            return res.status(200).json({
                status: "ok",
                data: result
            })
        }).catch((e) => {
            log.warn(`cause from update(eid,fullname,age) method await : ${e.message}`)
            throw e
        })
    } catch (e) {
        res.status(405).json({
            status:'method not allowed',
            message : `cause from routerEmployee post async method (create) : ${e.message}`
        })
        throw myException.handlerException(`cause from routerEmployee put async method (update) : ${e.message}`) /* when find the exception == ended process*/
    }
})

routerEmployee.delete('/delete/(:eid)' , async (req,res) => {
    try {
        await crudEmployeeService.delete(req.params['eid']).then((result) => {
            return res.status(200).json({
                status: "ok",
                data: result
            })
        }).catch((e) => {
            log.warn(`cause from delete(eid) method await : ${e.message}`)
            throw e
        })
    } catch (e) {
        res.status(405).json({
            status:'method not allowed',
            message : `cause from routerEmployee post async method (create) : ${e.message}`
        })
        throw myException.handlerException(`cause from routerEmployee delete async method (delete) : ${e.message}`) /* when find the exception == ended process*/
    }
})



routerLogin.post('/create/(:eid)' , async (req,res) => {
    try {
        const {email ,password} = req.body
        await crudLoginService.create(req.params['eid'],email,password).then((result) => {
            return res.status(201).json({
                status: "create",
                data: result
            })
        }).catch((e) => {
            log.warn(`cause from create(eid,email,password) method await : ${e.message}`)
            throw e
        })
    } catch (e) {
        // log.warn(`cause from routerLogin post async method (create) : ${e.message}`)
        res.status(405).json({
            status:'method not allowed',
            message : `cause from routerLogin post async method (create) : ${e.message}`
        })
        throw myException.handlerException(`cause from routerLogin post async method (create) : ${e.message}`) /* when find the exception == ended process*/
    }
})

routerLogin.get('/reads' , async (req,res) => {
    try {
        await crudLoginService.reads().then((result) => {
            return res.status(202).json({
                status: "accepted",
                data: result
            })
        }).catch((e) => {
            log.warn(`cause from reads() method await : ${e.message}`)
            throw e
        })
    } catch (e) {
        log.warn(`cause from routerLogin get async method (reads) : ${e.message}`)
        throw e
    }
})

routerLogin.get('/read/(:eid)' , async (req,res) => {
    try {
        await crudLoginService.read(req.params['eid']).then((result) => {
            return res.status(202).json({
                status: "accepted",
                data: result
            })
        }).catch((e) => {
            log.warn(`cause from read(eid) method await : ${e.message}`)
            throw e
        })
    } catch (e) {
        log.warn(`cause from routerLogin get async method (read) : ${e.message}`)
        throw e
    }
})

routerLogin.put('/update/(:eid)' , async (req,res) => {
    try {
        const {email,password} = req.body
        await crudLoginService.update(req.params['eid'],email,password).then((result) => {
            return res.status(200).json({
                status: "ok",
                data: result
            })
        }).catch((e) => {
            log.warn(`cause from update(eid,email,password) method await : ${e.message}`)
            throw e
        })
    } catch (e) {
        res.status(405).json({
            status:'method not allowed',
            message : `cause from routerLogin put async method (update) : ${e.message}`
        })
        throw myException.handlerException(`cause from routerLogin update async method (update) : ${e.message}`) /* when find the exception == ended process*/
    }
})

routerLogin.delete('/delete/(:eid)' , async (req,res) => {
    try {
        await crudLoginService.delete(req.params['eid']).then((result) => {
            return res.status(200).json({
                status: "ok",
                data: result
            })
        }).catch((e) => {
            log.warn(`cause from delete(eid) method await : ${e.message}`)
            throw e
        })
    } catch (e) {
        res.status(405).json({
            status:'method not allowed',
            message : `cause from routerLogin delete async method (update) : ${e.message}`
        })
        throw myException.handlerException(`cause from routerLogin delete async method (delete) : ${e.message}`) /* when find the exception == ended process*/
    }
})

module.exports = {
    routerEmployee: routerEmployee ,
    routerLogin
}


