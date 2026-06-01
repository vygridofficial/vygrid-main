const fs = require('fs');
const https = require('https');
const path = require('path');

const projects = [
  { name: 'property_express', url: 'https://res.cloudinary.com/dm9tmagpg/image/upload/v1780308287/vygrid/WhatsApp_Image_2026-06-01_at_2_05_44_PM-1780308286913.jpg' },
  { name: 'gateway_kitchen', url: 'https://res.cloudinary.com/dm9tmagpg/image/upload/v1780304915/vygrid/gat-1780304915173.png' },
  { name: 'rexon_interiors', url: 'https://res.cloudinary.com/dm9tmagpg/image/upload/v1780305029/vygrid/rex-1780305029658.png' },
  { name: 'decorio', url: 'https://res.cloudinary.com/dm9tmagpg/image/upload/v1780305134/vygrid/WhatsApp_Image_2026-06-01_at_2_39_18_PM-1780305134014.jpg' }
];

function download(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get: ${res.statusCode}`));
        return;
      }
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  const dir = path.join(__dirname, 'downloaded_thumbs');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  for (const proj of projects) {
    const ext = proj.url.endsWith('.png') ? '.png' : '.jpg';
    const dest = path.join(dir, proj.name + ext);
    try {
      await download(proj.url, dest);
      const stats = fs.statSync(dest);
      console.log(`Downloaded ${proj.name} to ${dest} (${stats.size} bytes)`);
    } catch (err) {
      console.error(`Error downloading ${proj.name}:`, err.message);
    }
  }
}

run();
