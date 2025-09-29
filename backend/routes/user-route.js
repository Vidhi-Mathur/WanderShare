import express from 'express'
import { postSignup, postLogin, postLogout } from '../controllers/user-controller.js'
const router = express.Router()

//POST /wandershare/signup: To create a new user
router.post('/signup', postSignup)

//POST /wandershare/login: To log in an existing user
router.post('/login', postLogin)

//POST /wandershare/logout: To log out the current user
router.post('/logout', postLogout)

export default router