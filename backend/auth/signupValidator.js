const { body } = require('express-validator');
const prisma = require('../prisma/seed');

const requiredErr = 'is required';
const lengthErr = 'must have at least 8 letters';

module.exports = [
  body('firstName').trim().notEmpty().withMessage(`First Name ${requiredErr}`),
  body('lastName').trim().notEmpty().withMessage(`First Name ${requiredErr}`),
  body('username')
    .trim()
    .notEmpty()
    .withMessage(`Username ${requiredErr}`)
    .custom(async (username) => {
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });
      if (user) {
        throw new Error('Username already taken');
      }
      return true;
    }),
  body('password')
    .trim()
    .notEmpty()
    .withMessage(`Password ${requiredErr}`)
    .isLength({ min: 8 })
    .withMessage(`Password ${lengthErr}`),
  body('confirmPwd')
    .notEmpty()
    .withMessage(`Confirm Password ${requiredErr}`)
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
];
