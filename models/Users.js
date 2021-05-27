// Dependencies
// =============================================================
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt= require('bcrypt')
class Users extends Model { }

Users.init(
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize
    }
);

// Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
Users.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
// Hooks are automatic methods that run during various phases of the User Model lifecycle
// In this case, before a User is created, we will automatically hash their password
Users.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
});
module.exports = Users;