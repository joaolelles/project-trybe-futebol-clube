import express = require('express');
import loginController from '../controllers/login.controller';
import validateFieldsLogin from '../middlewares/validateFieldsLogin';

const router = express.Router();

router.post('/', validateFieldsLogin, loginController.login);

export default router;
