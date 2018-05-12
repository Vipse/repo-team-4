const {createServer} = require("./src/server/server");

const {
    MONGO_USER = "Vipse1323",
    MONGO_PASSWORD = "repoteam1234",
    MONGO_LOCAL = "false",
    MONGO_DATABSE = "yandexvipse",
    MONGO_HOST = "ds119090.mlab.com",
    MONGO_PORT = 19090,
    // SERVER_HOST = "localhost",
    // SERVER_PORT = 3001
} = process.env;


/**
 * Setup mongo configuration
 */
const DATABASE_CONFIG = {
    user: MONGO_USER,
    password: MONGO_PASSWORD,
    host: MONGO_HOST,
    port: MONGO_PORT,
    local: MONGO_LOCAL !== "false",
    database: MONGO_DATABSE
};

/**
 * Socket.io server
 */
const SERVER_CONFIG = {
    host: "localhost",
    port: 3001
};

createServer(SERVER_CONFIG, DATABASE_CONFIG)
    .catch(err => {
        console.log(err);
    });
