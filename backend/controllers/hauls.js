const prisma = require('../prisma/seed');
const slugify = require('../utils/slugify');

exports.getHauls = async (req, res) => {
  try {
    const allHauls = await prisma.haul.findMany({
      orderBy: {
        timestamp: 'desc',
      },
    });
    res.status(200).json(allHauls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createHaul = async (req, res) => {
  try {
    const { date, storeName, notes, images, userId, items } = req.body;
    const slug = slugify(date, storeName);

    const haul = await prisma.haul.create({
      data: {
        date,
        storeName,
        slug,
        notes,
        images: images || [],
        userId,
        items: {
          create: items.map((item) => ({
            name: item.name,
            quantity: item.quantity || 1,
            price: item.price || null,
            recommended: item.recommended || false,
            onSale: item.onSale || false,
          })),
        },
      },
      include: {
        items: true,
        comments: true,
      },
    });
    return res.status(201).json({ message: 'haul saved', haul });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateHaul = async (req, res) => {
  try {
    const haulId = parseInt(req.params.id, 10);
    const { date, storeName, notes, images, userId, items } = req.body;
    const newSlug = slugify(date, storeName);

    const haul = await prisma.haul.update({
      where: { id: haulId },
      data: {
        date,
        storeName,
        slug: newSlug,
        notes,
        images,
        userId,
        items,
      },
    });
    return res.status(201).json({ message: 'haul saved', haul });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteHaul = async (req, res) => {
  try {
    const haulId = parseInt(req.params.id, 10);
    await prisma.haul.delete({
      where: { id: haulId },
    });
    return res.status(200).json({ message: 'haul deleted' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
