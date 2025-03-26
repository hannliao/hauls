const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function uploadFile(file, haulId) {
  try {
    // create unique file name
    const fileName = `${Date.now()}-${file.originalname}`;

    // upload file to Supabase storage
    const { data, error } = await supabase.storage
      .from(process.env.BUCKET_NAME)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      console.error('Error uploading file:', error);
    } else {
      console.log('File uploaded:', data);
    }

    // get public URL of uploaded image
    const publicUrl = supabase.storage
      .from(process.env.BUCKET_NAME)
      .getPublicUrl(fileName).publicURL;

    // save public URL in database
    await prisma.haul.update({
      where: { id: haulId },
      data: {
        images: {
          push: publicUrl,
        },
      },
    });
    return publicUrl;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to save image: ' + error.message);
  }
}

async function deleteFile(filePath) {
  const { data, error } = await supabase.storage
    .from(process.env.BUCKET_NAME)
    .remove([filePath]);

  if (error) {
    console.error('Error deleting file:', error);
  } else {
    console.log('File deleted:', data);
  }
}

module.exports = {
  uploadFile,
  deleteFile,
};
