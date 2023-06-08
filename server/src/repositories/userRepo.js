//@ts-check
const { pool } = require('../setup/pg')

/**
 * @param {{username: string, password: string}} params
 * @returns {Promise<import("../types").UsersTableRow | null>}
 */
exports.insertUser = async function insertUser({ username, password }) {
  const now = new Date()
  const res = await pool.query(
    'insert into users (username, password, created_at, updated_at) values ($1,$2,$3,$4) returning *',
    [username, password, now, now]
  )
  if (res.rowCount == 0) {
    return null
  }
  return res.rows[0]
}

/**
 * @param {string} username
 * @returns {Promise<import("../types").UsersTableRow | null>}
 */
exports.getUserByUsername = async function getUserByUsername(username) {
  const res = await pool.query('select * from users where username=$1', [
    username,
  ])
  if (res.rowCount == 0) {
    return null
  }
  return res.rows[0]
}
