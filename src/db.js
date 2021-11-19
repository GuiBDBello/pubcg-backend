const Sequelize = require('sequelize');

if (process.env.NODE_ENV.toUpperCase() == 'PRD') {
    const database = process.env.DATABASE_NAME;
    const username = process.env.DATABASE_USERNAME;
    const password = process.env.DATABASE_PASSWORD;
    const host = process.env.DATABASE_HOST;
    const port = process.env.DATABASE_PORT;

    const options = {
        host: host,
        port: port,
        logging: console.log,
        maxConcurrentQueries: 100,
        dialect: 'mysql',
        dialectOptions: {
            ssl: 'Amazon RDS'
        },
        pool: { maxConnections: 5, maxIdleTime: 30 },
        language: 'en'
    };

    const sequelize = new Sequelize(database, username, password, options);

    module.exports = sequelize;
} else {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './database.sqlite'
    });

    module.exports = sequelize;
}
