const { Router } = require('express');
const router = Router();
const controller = require('../controllers/hauls');
const passport = require('../auth/passport');
const upload = require('../utils/multer');

router.get('/', controller.getHauls);
router.get('/user/:username', controller.getUserHauls);
router.get('/:username/:slug', controller.getHaulByUrl);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  upload,
  controller.createHaul
);
router.put(
  '/:username/:slug',
  passport.authenticate('jwt', { session: false }),
  controller.updateHaul
);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  controller.deleteHaul
);

module.exports = router;
