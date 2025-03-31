const prisma = require('../prisma/seed');
const slugify = require('../utils/slugify');
const uploadImages = require('../utils/uploadImages');

exports.getHauls = async (req, res) => {
  try {
    const allHauls = await prisma.haul.findMany({
      orderBy: {
        dateOfPurchase: 'desc',
      },
      include: {
        items: true,
      },
    });
    res.status(200).json(allHauls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHaulByUrl = async (req, res) => {
  try {
    const { username, slug } = req.params;
    const haul = await prisma.haul.findUnique({
      where: { username: username, slug: slug },
      include: {
        items: true,
      },
    });

    if (!haul) {
      return res.status(404).json({ error: 'Haul not found' });
    }

    return res.status(200).json({ haul });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createHaul = [
  // uploadImages,
  async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: 'Unauthorized: User not found' });
      }
      const { dateOfPurchase, storeName, notes, items } = req.body;
      const slug = slugify(dateOfPurchase, storeName);

      const haul = await prisma.haul.create({
        data: {
          dateOfPurchase,
          storeName,
          slug,
          notes,
          images: req.imageUrls || [],
          userId: req.user.id,
          username: req.user.username,
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
      if (err.code === 'P2002') {
        res.status(400).json({
          error:
            'A haul with this store and date already exists for this user. Please change the store name (e.g. Costco #2).',
        });
      }
      return res.status(500).json({ error: err.message });
    }
  },
];

exports.updateHaul = async (req, res) => {
  try {
    const { username, slug } = req.params;
    const { dateOfPurchase, storeName, notes, images, userId, items } =
      req.body;
    const newSlug = slugify(dateOfPurchase, storeName);

    const haul = await prisma.haul.update({
      where: { username, slug },
      data: {
        dateOfPurchase,
        storeName,
        slug: newSlug,
        notes,
        images,
        userId,
        items: {
          deleteMany: {},
          create: items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price || null,
            recommended: item.recommended,
            onSale: item.onSale,
          })),
        },
      },
    });
    return res.status(201).json({ message: 'haul saved', haul });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message, details: err });
  }
};

exports.deleteHaul = async (req, res) => {
  try {
    const haulId = req.params.id;
    await prisma.haul.delete({
      where: { id: haulId },
    });
    return res.status(200).json({ message: 'haul deleted' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
