const { Router } = require('express');
const router = Router();
const controller = require('../controllers/auth');

router.post('/signup', controller.signupPost);
router.post('/login', controller.loginPost);

module.exports = router;
