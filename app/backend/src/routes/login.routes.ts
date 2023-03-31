import express = require('express');
import LoginController from '../controllers/login.controller';
import validateFieldsLogin from '../middlewares/validateFieldsLogin';
import authToken from '../middlewares/validateToken';
import Users from '../database/models/userModel';
import LoginService from '../service/login.service';

const loginService = new LoginService(Users);
const loginController = new LoginController(loginService);

const router = express.Router();

router.post('/', validateFieldsLogin, loginController.postLogin);
router.get('/role', authToken, loginController.getRole);

export default router;
