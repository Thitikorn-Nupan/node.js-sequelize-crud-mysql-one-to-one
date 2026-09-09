/**
 //  got error is i use jest as name SyntaxError: Identifier 'jest' has already been declared
 // The error occurs because Jest injects a local wrapper variable named jest into your CommonJS module scope
 How to Fix It
 Rename your variable: Change any local declaration or import named jest to something else (e.g., const { jest: myJest } = require('@jest/globals')).
 Disable injected globals: Configure Jest to turn off global injections via injectGlobals: false in your Jest Documentation configuration if you prefer importing explicit globals.
 */
const {beforeEach, describe, expect, jest: commonJst, test} = require('@jest/globals');


// jest.fn() creates a mock function that records calls and can return test data.
const mockEmployee = {
    hasOne: commonJst.fn(), // Employee.hasOne(Login , { foreignKey : 'eid' })
    findAll: commonJst.fn(),
    findByPk: commonJst.fn(),
    create: commonJst.fn(),
    update: commonJst.fn(),
    destroy: commonJst.fn()
}
const mockLogin = {
    belongsTo: commonJst.fn(), // Login.belongsTo(Employee , { foreignKey : 'eid' })
    removeAttribute: commonJst.fn(),
    findAll: commonJst.fn(),
    findByPk: commonJst.fn(),
    create: commonJst.fn(),
    update: commonJst.fn(),
    destroy: commonJst.fn()
}

commonJst.mock('../entities/employee', () => mockEmployee)
commonJst.mock('../entities/login', () => mockLogin)

const crud = require('../services/crud-service')

describe('jest unit test for crud-service.js CrudEmployeeService class -> ', () => {
    beforeEach(() => {
        commonJst.clearAllMocks()
    })

    test('reads employees with their logins', async () => {
        const employees = [
            {
                eid: 1,
                fullname: "John Doe",
                age: 30,
                login_employees_4: {
                    email: "john@example.com",
                    password: "password123"
                }
            },
            {
                eid: 2,
                fullname: "John Son",
                age: 30,
                login_employees_4: {
                    email: "johnson@example.com",
                    password: "password123"
                }
            }
        ]
        mockEmployee.findAll.mockResolvedValue(employees)

        await expect(crud.crudEmployee.reads()).resolves.toBe(employees)
        expect(mockEmployee.findAll).toHaveBeenCalledWith({
            include: [{
                model: mockLogin,
                attributes: {exclude: ['eid']}
            }]
        })
        /*
            *** expect(pool.query) tells Jest which mock function to inspect.
            *** expect.any(Function) means the second argument can be any function In the controller, this is the database callback
            await Employee.findAll({
            include : [{
                    model : Login,
                    attributes : {exclude:['eid']}
                }]
            })
        */
    })

    test('reads one employee with their login', async () => {
        const employee = {
            eid: 1,
            fullname: "John Doe",
            age: 30,
            login_employees_4: {
                email: "john@example.com",
                password: "password123"
            }
        }
        mockEmployee.findByPk.mockResolvedValue(employee)

        await expect(crud.crudEmployee.read(1)).resolves.toBe(employee)
        expect(mockEmployee.findByPk).toHaveBeenCalledWith(1, {
            include: [{
                model: mockLogin,
                attributes: {exclude: ['eid']}
            }]
        })
    })

    test('creates an employee', async () => {
        const employee = {eid: 1, fullname: 'John Doe', age: 30}
        mockEmployee.create.mockResolvedValue(employee)

        await expect(crud.crudEmployee.create('John Doe', 30)).resolves.toBe(employee)
        expect(mockEmployee.create).toHaveBeenCalledWith({fullname: 'John Doe', age: 30})
    })

    test('updates an existing employee', async () => {
        mockEmployee.findAll.mockResolvedValue([{eid: 1}])
        mockEmployee.update.mockResolvedValue([1])

        await expect(crud.crudEmployee.update(1, 'Jane Doe', 31)).resolves.toBe(true)
        expect(mockEmployee.findAll).toHaveBeenCalledWith({where: {eid: 1}})
        expect(mockEmployee.update).toHaveBeenCalledWith(
            {fullname: 'Jane Doe', age: 31},
            {where: {eid: 1}}
        )
    })

    test('deletes an employee and its login', async () => {
        mockLogin.findAll.mockResolvedValue([{eid: 1}])
        mockLogin.destroy.mockResolvedValue(1)
        mockEmployee.destroy.mockResolvedValue(1)

        await expect(crud.crudEmployee.delete(1)).resolves.toBe(true)
        expect(mockLogin.findAll).toHaveBeenCalledWith({where: {eid: 1}})
        expect(mockLogin.destroy).toHaveBeenCalledWith({where: {eid: 1}})
        expect(mockEmployee.destroy).toHaveBeenCalledWith({where: {eid: 1}})
    })
})

describe('jest unit test for crud-service.js CrudLoginService class -> ', () => {
    beforeEach(() => {
        commonJst.clearAllMocks()
    })

    test('creates a login for an employee', async () => {
        const login = {eid: 1, email: 'john@example.com', password: 'secret'}
        mockEmployee.findByPk.mockResolvedValue({eid: 1})
        mockLogin.create.mockResolvedValue(login)

        await expect(
            crud.crudLogin.create(1, 'john@example.com', 'secret')
        ).resolves.toBe(login)
        expect(mockEmployee.findByPk).toHaveBeenCalledWith(1)
        expect(mockLogin.create).toHaveBeenCalledWith({
            eid: 1,
            email: 'john@example.com',
            password: 'secret'
        })
    })

    test('reads all logins', async () => {
        const logins = [{eid: 1, email: 'john@example.com'}]
        mockLogin.findAll.mockResolvedValue(logins)

        await expect(crud.crudLogin.reads()).resolves.toBe(logins)
        expect(mockLogin.findAll).toHaveBeenCalledWith()
    })

    test('reads a login by employee id', async () => {
        const logins = [{eid: 1, email: 'john@example.com'}]
        mockLogin.findAll.mockResolvedValue(logins)

        await expect(crud.crudLogin.read(1)).resolves.toBe(logins)
        expect(mockLogin.findAll).toHaveBeenCalledWith({where: {eid: 1}})
    })

    test('updates an existing login', async () => {
        mockLogin.findAll.mockResolvedValue([{eid: 1}])
        mockLogin.update.mockResolvedValue([1])

        await expect(
            crud.crudLogin.update(1, 'jane@example.com', 'new-secret')
        ).resolves.toBe(true)
        expect(mockLogin.findAll).toHaveBeenCalledWith({where: {eid: 1}})
        expect(mockLogin.update).toHaveBeenCalledWith(
            {email: 'jane@example.com', password: 'new-secret'},
            {where: {eid: 1}}
        )
    })

    test('deletes an existing login', async () => {
        mockLogin.findAll.mockResolvedValue([{eid: 1}])
        mockLogin.destroy.mockResolvedValue(1)

        await expect(crud.crudLogin.delete(1)).resolves.toBe(true)
        expect(mockLogin.findAll).toHaveBeenCalledWith({where: {eid: 1}})
        expect(mockLogin.destroy).toHaveBeenCalledWith({where: {eid: 1}})
    })
})