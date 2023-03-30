import express = require('express');
import loginController from '../controllers/login.controller';
import validateFieldsLogin from '../middlewares/validateFieldsLogin';
import authToken from '../middlewares/validateToken';

const router = express.Router();

router.post('/', validateFieldsLogin, loginController.login);
router.get('/role', authToken, loginController.getRole);

export default router;
