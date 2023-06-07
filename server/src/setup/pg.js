const pg = require('pg')
const config = require("config")

const uri = config.get("database.URI")

const pool = new pg.Pool({
    connectionString: uri
})

module.exports = {
    pool
}