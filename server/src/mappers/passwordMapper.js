/**
 * @param {import("../types").PasswordsTableRow} row
 * @returns {import("../types").PasswordRespDTO}
 */
exports.passwordTableRowToRespDTO = function (row) {
  return {
    id: row.id,
    encryptedName: row.encrypted_name,
    encryptedValue: row.encrypted_value,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}
