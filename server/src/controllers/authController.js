/**
 * @typedef {import('express').RequestHandler} RequestHandler
 * @typedef {import('../types').ControllerRegisterFn} ControllerRegisterFn
 * @typedef {import('../types').AsyncHandler} AsyncHandler
 */
const express = require('express')
const { body } = require('express-validator')
const validate = require('../lib/middleware/validate')
const catchAsync = require('../lib/utils/catchAsync')
const createHttpError = require('http-errors')
const userRepo = require('../repositories/userRepo')
const { userRespDTOFromTableRow } = require('../mappers/userMapper')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const config = require('config')

const jwtConfig = {
  secret: config.get('jwt.secret'),
  expiresIn: config.get('jwt.expiresIn'),
  algorithm: config.get('jwt.algorithm'),
}

/**@type {ControllerRegisterFn} */
function registerAuthController(app) {
  let router = express.Router()

  router.post(
    '/signup',
    [
      body('username').notEmpty().withMessage('username is required'),
      body('password').notEmpty().withMessage('password is required'),
      validate(),
    ],
    catchAsync(signupHandler)
  )

  router.post(
    '/login',
    [
      body('username').notEmpty().withMessage('username is required'),
      body('password').notEmpty().withMessage('password is required'),
      validate(),
    ],
    catchAsync(loginHandler)
  )

  app.use('/auth', router)
}

/** @type {AsyncHandler} */
async function signupHandler(req, res, next) {
  const { username, password } = req.body
  const existing = await userRepo.getUserByUsername(username)
  if (existing) {
    throw new createHttpError.BadRequest('username taken')
  }
  // store in db
  const salt = await bcryptjs.genSalt(10)
  const hashedPassword = await bcryptjs.hash(password, salt)
  const user = await userRepo.insertUser({ username, password: hashedPassword })
  if (!user) {
    throw new Error("can't create user")
  }
  return res.json(userRespDTOFromTableRow(user))
}

/** @type {AsyncHandler} */
async function loginHandler(req, res, next) {
  const { username, password } = req.body
  const user = await userRepo.getUserByUsername(username)
  if (!user) {
    throw new createHttpError.BadRequest('user not found')
  }
  // compare password
  const result = await bcryptjs.compare(password, user.password)
  if (!result) {
    throw new createHttpError.Unauthorized('invalid password')
  }
  const accessToken = await jwt.sign(
    userRespDTOFromTableRow(user),
    jwtConfig.secret,
    {
      algorithm: jwtConfig.algorithm,
      expiresIn: jwtConfig.expiresIn,
    }
  )
  return res.json({
    accessToken,
  })
}

module.exports = {
  registerAuthController,
}
