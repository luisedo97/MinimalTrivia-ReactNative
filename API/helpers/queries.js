const PS = require('pg-promise').PreparedStatement;
let queries = {
    general: {
        newUser: new PS('new-user', "INSERT INTO USERS (users_username, users_password, users_name) VALUES ($1, $2, $3)"),
        getUser: new PS('get-user', "SELECT * FROM USERS WHERE users_username = $1"),
    }
}

module.exports = queries;