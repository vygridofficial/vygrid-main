const fs = require('fs');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');

// Parse .env.local file
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)\s*$/);
  if (match) {
    const key = match[1].trim();
    let val = match[2].trim();
    // remove quotes if any
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
    env[key] = val;
  }
});

// Configure cloudinary
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

console.log('Testing Cloudinary upload with config:', {
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: '*'.repeat(env.CLOUDINARY_API_SECRET ? env.CLOUDINARY_API_SECRET.length : 0),
});

// Small dummy transparent 1x1 pixel PNG in base64
const dummyBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
const buffer = Buffer.from(dummyBase64, 'base64');

async function run() {
  try {
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: env.CLOUDINARY_FOLDER || 'vygrid',
          public_id: `test-upload-${Date.now()}`,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.write(buffer);
      uploadStream.end();
    });
    console.log('Upload success:', uploadResult.secure_url);
  } catch (error) {
    console.error('Upload failed with error:', error);
  }
}

run();
