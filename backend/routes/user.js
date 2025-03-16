const { Router } = require('express');
const router = Router();
const controller = require('../controllers/user');
const passport = require('../auth/passport');

router.get('/', controller.getUser);
router.get('/:username', controller.getUserByUsername);
router.put(
  '/:username/edit',
  passport.authenticate('jwt', { session: false }),
  controller.editUser
);

module.exports = router;
