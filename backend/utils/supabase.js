const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function uploadFile(filePath, file) {
  const { data, error } = await supabase.storage
    .from(process.env.BUCKET_NAME)
    .upload(filePath, file);

  if (error) {
    console.error('Error uploading file:', error);
  } else {
    console.log('File uploaded:', data);
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
  downloadFile,
  deleteFile,
};
