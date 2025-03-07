const slugify = (date, storeName) => {
  const formattedDate = format(new Date(date), 'yyyy-MM-dd');
  const slugifiedStoreName = storeName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // replace multiple consecutive hyphens
  return `${formattedDate}-${slugifiedStoreName}`;
};

module.exports = slugify;
