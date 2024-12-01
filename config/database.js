const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

var sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        operatorsAliases: false,
        define: {
            // имена таблиц не будут создаваться автоматически во множественном числе

            
            // запрет на автоматическое создание полей createdAt и updatedAt (эти поля по умолчанию создаются ORM Sequalize во всех таблицах, при желании можете включить эту настройку)
            timestamps: false
        }
    }
);


module.exports = sequelize;