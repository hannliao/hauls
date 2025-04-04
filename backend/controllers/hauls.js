const prisma = require('../prisma/seed');
const generateSlug = require('../utils/generateSlug');
const saveDateUTC = require('../utils/saveDateUTC');
const uploadImages = require('../utils/uploadImages');

exports.getHauls = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const totalCount = await prisma.haul.count();

    const hauls = await prisma.haul.findMany({
      skip,
      take: limit,
      orderBy: {
        dateOfPurchase: 'desc',
      },
      include: {
        items: true,
      },
    });
    res.status(200).json({
      hauls,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserHauls = async (req, res) => {
  try {
    const { username } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const totalCount = await prisma.haul.count({
      where: { username },
    });

    const hauls = await prisma.haul.findMany({
      where: { username },
      skip,
      take: limit,
      orderBy: {
        dateOfPurchase: 'desc',
      },
      include: {
        items: true,
      },
    });
    res.status(200).json({
      hauls,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit),
      },
    });
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
      const utcDateAtNoon = saveDateUTC(dateOfPurchase);
      const slug = await generateSlug(req.user.id, utcDateAtNoon, storeName);

      const haul = await prisma.haul.create({
        data: {
          dateOfPurchase: utcDateAtNoon,
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
      return res.status(500).json({ error: err.message });
    }
  },
];

exports.updateHaul = async (req, res) => {
  try {
    const { username, slug } = req.params;
    const { dateOfPurchase, storeName, notes, images, userId, items } =
      req.body;
    const utcDateAtNoon = saveDateUTC(dateOfPurchase);
    const newSlug = await generateSlug(req.user.id, dateOfPurchase, storeName);

    const haul = await prisma.haul.update({
      where: { username, slug },
      data: {
        dateOfPurchase: utcDateAtNoon,
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
