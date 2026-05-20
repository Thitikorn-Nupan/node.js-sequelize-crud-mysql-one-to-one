const config = require('../config/database-config')
const configSequel = config.sequelizeConfig
const { DataTypes } = config.sequelize
const Login = configSequel.define( // build entity by sequelize
    'login_employees_4' , {
        id : {
            type : DataTypes.INTEGER ,
            primaryKey : true,
            autoIncrement: true
        },
        email : {
            type: DataTypes.STRING
        } ,
        password : {
            type : DataTypes.STRING,
        },
        eid : {
            type : DataTypes.INTEGER ,
            references : { //  setting foreign key
                model : 'employees_4',
                key : 'eid'
            }}
    } ,
    {
        freezeTableName: true , // freeze name table not using *s on name
        timestamps: false // don't use createdAt/update
    }
)

module.exports = Login