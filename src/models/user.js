module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        }
    }, {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    })
    return User
}