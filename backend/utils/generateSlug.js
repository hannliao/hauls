const slugify = require('slugify');
const { format } = require('date-fns');
const prisma = require('../prisma/seed');

const generateSlug = async (userId, dateOfPurchase, storeName) => {
  const formattedDate = format(new Date(dateOfPurchase), 'yyyy-MM-dd');
  const storeNameSlug = slugify(`${storeName}`, { lower: true, strict: true });
  const baseSlug = `${formattedDate}-${storeNameSlug}`;

  const existingHauls = await prisma.haul.findMany({
    where: {
      userId,
      dateOfPurchase,
      storeName,
    },
  });

  const slug =
    existingHauls.length > 0
      ? `${baseSlug}-${existingHauls.length + 1}`
      : baseSlug;

  return slug;
};

module.exports = generateSlug;
