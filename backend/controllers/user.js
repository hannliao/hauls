const prisma = require('../prisma/seed');

exports.getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        bio: true,
        city: true,
        state: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error retrieving user', error: err.message });
  }
};

exports.getUserByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        bio: true,
        city: true,
        state: true,
      },
    });

    if (!user) {
      return res.stats(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error retrieving user', error: err.message });
  }
};

exports.editUser = async (req, res) => {
  try {
    const { firstName, lastName, bio, city, state } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        firstName,
        lastName,
        bio,
        city,
        state,
      },
    });

    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
