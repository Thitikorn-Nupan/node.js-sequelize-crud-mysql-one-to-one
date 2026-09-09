const config = require('../config/database-config')
const configSequel = config.sequelizeConfig
const {DataTypes} = config.sequelize

const Employee = configSequel.define( // build entity by sequelize
    'employees_4', {
        eid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fullname: {
            type: DataTypes.STRING
        },
        age: {
            type: DataTypes.INTEGER,
        }
    },
    {
        freezeTableName: true, // freeze name table not using *s on name
        timestamps: false // don't use createdAt/update
    }
)

module.exports = Employee