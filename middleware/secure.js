const basicAuth = require("express-basic-auth");

const secure= basicAuth({
        users: {enock: "enock123"},
        challenge: true
    })

module.exports = secure;