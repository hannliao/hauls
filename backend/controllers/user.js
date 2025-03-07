const prisma = require('../prisma/seed');

exports.getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user: { id: user.id, username: user.username } });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error retrieving user data', error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true },
    });
    return res.status(200).json({ users });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error retrieving users', error: err.message });
  }
};
