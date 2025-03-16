const { Router } = require('express');
const router = Router();
const controller = require('../controllers/user');
const passport = require('../auth/passport');
const { ensureCorrectUser } = require('../auth/ensureCorrectUser');

router.get('/', controller.getUser);
router.get('/:username', controller.getUserByUsername);
router.put(
  '/:username/edit',
  passport.authenticate('jwt', { session: false }),
  ensureCorrectUser,
  controller.editUser
);

module.exports = router;
