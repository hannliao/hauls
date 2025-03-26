const uploadImages = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      let errorMessage = '';

      if (err.code === 'LIMIT_FILE_SIZE') {
        errorMessage = 'File should not exceed 5 MB';
      } else if (err.code === 'UNSUPPORTED_FILE_TYPE') {
        errorMessage = 'Only .jpg, .jpeg, and .png files are allowed';
      } else {
        errorMessage = 'File upload failed';
      }

      return res.status(400).json({ error: errorMessage });
    }

    if (req.files && req.files.length > 5) {
      return res.status(400).json({ error: 'You may add up to 5 images' });
    }

    try {
      const imageUrls = await Promise.all(
        req.files.map((file) => uploadFile(file, haulId))
      );

      req.imageUrls = imageUrls;
      next();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to save image' });
    }
  });
};

module.exports = uploadImages;
