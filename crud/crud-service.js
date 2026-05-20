module.exports = crud = {}
const Employee = require('../entities/employee')
const Login = require('../entities/login')
Employee.hasOne(Login , { foreignKey : 'eid' })
Login.belongsTo(Employee , { foreignKey : 'eid' })
Login.removeAttribute('id') // removed created column id auto

class CrudEmployeeService {
    // these are functions
    reads = async () => { /* reads direct left join */
        return await Employee.findAll({
            include : [{
                model : Login,
                attributes : {exclude:['eid']}
            }]
        })
    }

    read = async (eid) => { /* read by primary key direct left join */
        return await Employee.findByPk(eid ,{
            include : [{
                model : Login,
                attributes : {exclude:['eid']}
            }]
        })
    }

    create = async (fullname , age ) => {
        return  await Employee.create({fullname,age})
    }

    update = async (eid , fullname , age) => {
        return await Employee.findAll( {where : {eid : eid}}).then( async (found) => {
            /* disadvantage for using findByPk
            *  when not found eid it was still return true */
            if (found.length !== 0) {
                return await Employee.update( {fullname,age} , {where : {eid : eid}}).then(()=> {
                    return true
                })
            }
            return false
        })
    }

    delete = async (eid) => {
        return await Login.findAll({where : {eid: eid}}).then( async (lg) => {
            if (lg.length !== 0) {
                return await Login.destroy({where : {eid:eid}}).then(async () => {
                    return await Employee.destroy({where : {eid : eid}}).then(() => {
                        return true
                    })
                })
            } else {
                return await Employee.destroy({where : {eid : eid}}).then((row) => {
                    if (row !== 0) return true
                    else return false
                })
            }
        })
    }

}

class CrudLoginService {
    create = async (eid,email,password) => {
        return await Employee.findByPk(eid).then( async () => {
            return  await Login.create({eid,email,password})
        })
    }
    reads = async () => {
        return await Login.findAll()
    }
    read = async (eid) => {
        return await Login.findAll({where :{eid : eid}})
    }
    update = async (eid ,email , password) => {
        return await Login.findAll({where : {eid : eid}}).then(async (lg) => {
            if (lg.length !== 0) {
                return await Login.update({email,password} , {where : {eid : eid}}).then(() => {
                    return true
                })
            } else {
                return false
            }
        })
    }
    delete = async (eid) => {
        return await Login.findAll({where : {eid : eid}}).then(async (lg) => {
            if (lg.length !== 0) {
                return await Login.destroy({where : {eid : eid}}).then(() => {
                    return true
                })
            } else {
                return false
            }
        })
    }
}

crud.crudEmployee = new CrudEmployeeService() // add object class to object crud
crud.crudLogin = new CrudLoginService()
module.exports = crud