import express from 'express'
import { postSignup, postLogin, postLogout, getUserProfile } from '../controllers/user-controller.js'
const router = express.Router()

//POST /wandershare/user/signup: To create a new user
router.post('/signup', postSignup)

//POST /wandershare/user/login: To log in an existing user
router.post('/login', postLogin)

//POST /wandershare/user/logout: To log out the current user
router.post('/logout', postLogout)

//GET /wandershare/user/:userId: To get current user's profile
router.get('/:userId', getUserProfile)

export default router