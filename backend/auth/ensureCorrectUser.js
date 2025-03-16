const ensureCorrectUser = (req, res, next) => {
  if (req.user.username !== req.params.username) {
    return res
      .status(403)
      .json({ message: 'You do not have permission to edit this profile.' });
  }
  next();
};

module.exports = { ensureCorrectUser };
