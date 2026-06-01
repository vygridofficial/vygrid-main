const https = require('https');

const urls = [
  'https://res.cloudinary.com/dm9tmagpg/image/upload/v1780304915/vygrid/gat-1780304915173.png',
  'https://res.cloudinary.com/dm9tmagpg/image/upload/v1780305029/vygrid/rex-1780305029658.png',
  'https://res.cloudinary.com/dm9tmagpg/image/upload/v1780305134/vygrid/WhatsApp_Image_2026-06-01_at_2_39_18_PM-1780305134014.jpg'
];

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      console.log(`URL: ${url} -> Status Code: ${res.statusCode}`);
      resolve();
    }).on('error', (err) => {
      console.log(`URL: ${url} -> Error: ${err.message}`);
      resolve();
    });
  });
}

async function run() {
  for (const url of urls) {
    await checkUrl(url);
  }
}

run();
