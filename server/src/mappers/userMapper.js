/**
 * @param {import("../types").UsersTableRow} row
 * @returns {import("../types").UserRespDTO}
 */
exports.userRespDTOFromTableRow = function (row) {
  return {
    username: row.username,
  }
}
