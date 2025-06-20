const config = require('./index');

module.exports = {
    development: {
        username: config.db.user,
        password: config.db.password,
        database: config.db.name,
        host: config.db.host,
        port: config.db.port,
        dialect: config.db.dialect,
        logging: config.db.logging,
    },
    test: {
        username: config.db.user,
        password: config.db.password,
        database: `${config.db.name}_test`,
        host: config.db.host,
        port: config.db.port,
        dialect: config.db.dialect,
        logging: false,
    },
    production: {
        username: config.db.user,
        password: config.db.password,
        database: config.db.name,
        host: config.db.host,
        port: config.db.port,
        dialect: config.db.dialect,
        logging: false,
    },
}; 