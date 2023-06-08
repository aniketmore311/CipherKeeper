/**
 * @typedef {import('express').RequestHandler} RequestHandler
 * @typedef {import('../types').ControllerRegisterFn} ControllerRegisterFn
 * @typedef {import('../types').AsyncHandler} AsyncHandler
 */
const express = require('express')
const { body, param } = require('express-validator')
const validate = require('../lib/middleware/validate')
const catchAsync = require('../lib/utils/catchAsync')
const createHttpError = require('http-errors')
const passwordRepo = require('../repositories/passwordRepo')
const config = require('config')
const { auth } = require('../lib/middleware/auth')
const { passwordTableRowToRespDTO } = require('../mappers/passwordMapper')

/**@type {ControllerRegisterFn} */
exports.registerPasswordController = function (app) {
  let router = express.Router()
  router.get('/', [auth()], catchAsync(getPasswordsHandler))
  router.post(
    '/',
    [
      auth(),
      body('encryptedName').notEmpty(),
      body('encryptedValue').notEmpty(),
      validate(),
    ],
    catchAsync(createPasswordHandler)
  )
  router.delete(
    '/:id',
    [auth(), param('id').notEmpty().isNumeric(), validate()],
    catchAsync(deletePasswordHandler)
  )
  router.patch(
    '/:id',
    [
      auth(),
      param('id').notEmpty().isNumeric(),
      body('encryptedName').notEmpty().optional(),
      body('encryptedValue').notEmpty().optional(),
      validate(),
    ],
    catchAsync(updatePasswordHandler)
  )
  app.use('/passwords', router)
}

/**@type {AsyncHandler} */
async function getPasswordsHandler(req, res, next) {
  //@ts-expect-error
  const user = req.user
  const username = user.username
  const notes = await passwordRepo.getPasswordsByUsername(username)
  return res.json({
    passwords: notes.map(passwordTableRowToRespDTO).sort((a, b) => {
      return a.id - b.id
    }),
  })
}

/**@type {AsyncHandler} */
async function createPasswordHandler(req, res, next) {
  const { encryptedName, encryptedValue } = req.body
  //@ts-expect-error
  const username = req.user.username
  const password = await passwordRepo.insertPassword({
    encrypted_name: encryptedName,
    encrypted_value: encryptedValue,
    owner: username,
  })
  if (!password) {
    throw new Error("can't create password")
  }
  return res.json(passwordTableRowToRespDTO(password))
}

/**@type {AsyncHandler} */
async function deletePasswordHandler(req, res, next) {
  //@ts-expect-error
  const username = req.user.username
  const { id } = req.params
  const password = await passwordRepo.getPasswordById(Number(id))
  if (!password) {
    throw new createHttpError.NotFound('password not found')
  }
  if (username !== password.owner) {
    throw new createHttpError.Forbidden('unauthorized to access')
  }
  await passwordRepo.deletePassword(Number(id))
  return res.json(passwordTableRowToRespDTO(password))
}

/**@type {AsyncHandler} */
async function updatePasswordHandler(req, res, next) {
  //@ts-expect-error
  const username = req.user.username
  const { id } = req.params
  const password = await passwordRepo.getPasswordById(Number(id))
  if (!password) {
    throw new createHttpError.NotFound('password not found')
  }
  if (req.body.encryptedValue) {
    password.encrypted_value = req.body.encryptedValue
  }
  if (req.body.encryptedName) {
    password.encrypted_name = req.body.encryptedName
  }
  const updatedPassword = await passwordRepo.updatePassword({
    id: Number(id),
    encrypted_name: password.encrypted_name,
    encrypted_value: password.encrypted_value,
  })
  if (!updatedPassword) {
    throw new Error("can't update password")
  }
  return res.json(passwordTableRowToRespDTO(updatedPassword))
}
