//@ts-check
const { pool } = require("../setup/pg");

/**
 * @param {{name: string, encrypted_value: string, owner: string}} params 
 * @returns {Promise<import("../types").PasswordsTableRow | null>}
 */
exports.insertPassword = async function ({
    name,
    encrypted_value,
    owner,
}) {
    const now = new Date();
    const res = await pool.query("insert into passwords (name, encrypted_value, owner, created_at, updated_at) values ($1,$2,$3,$4,$5) returning *", [name, encrypted_value, owner, now, now]);
    if (res.rowCount == 0) {
        return null;
    }
    return res.rows[0]
}

/**
 * @param {number} id 
 * @returns {Promise<import("../types").PasswordsTableRow | null>}
 */
exports.getPasswordById = async function (id) {
    const res = await pool.query("select * from passwords where id=$1", [id]);
    if (res.rowCount == 0) {
        return null;
    }
    return res.rows[0]
}

/**
 * @param {string} username 
 * @returns {Promise<import("../types").PasswordsTableRow[] >}
 */
exports.getPasswordsByUsername = async function getUserByUsername(username) {
    const res = await pool.query("select * from passwords where owner=$1", [username]);
    return res.rows
}

/**
 * @param {{name: string, id: number, encrypted_value: string}} params 
 * @returns {Promise<import("../types").PasswordsTableRow | null>}
 */
exports.updatePassword = async function ({ id, name, encrypted_value }) {
    const now = new Date();
    const resp = await pool.query("update passwords set name=$1, encrypted_value=$2, updated_at=$3 where id=$4 returning *", [name, encrypted_value, now, id])
    if (resp.rowCount == 0) {
        return null;
    }
    return resp.rows[0]
}

/**
 * @param {number} id 
 */
exports.deletePassword = async function (id) {
    await pool.query("delete from passwords where id=$1", [id])
}