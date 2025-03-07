const { Router } = require('express');
const router = Router();
const controller = require('../controllers/comments');

router.get('/:postId/comments', controller.getComments);
router.post('/:postId/comments', controller.createComment);

module.exports = router;
