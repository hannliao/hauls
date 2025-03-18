const { Router } = require('express');
const router = Router();
const controller = require('../controllers/hauls');
const passport = require('../auth/passport');
const upload = require('../utils/multer');

router.get('/', controller.getHauls);
router.get('/:username/:slug', controller.getHaulByUrl);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  controller.createHaul
);
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  controller.updateHaul
);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  controller.deleteHaul
);

module.exports = router;
