const prisma = require('../prisma/seed');

exports.getComments = async (req, res) => {
  try {
    const postId = parseInt(req.params.postId, 10);

    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        user: {
          select: { id: true, username: true },
        },
      },
      orderBy: {
        timestamp: 'desc',
      },
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { content, userId, postId } = req.body;
    let username = 'anonymous';
    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { username: true },
      });
      if (user) {
        username = user.username;
      }
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        userId: userId || null,
        postId,
      },
    });

    return res
      .status(201)
      .json({ message: 'Comment sent', comment: { ...comment, username } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
