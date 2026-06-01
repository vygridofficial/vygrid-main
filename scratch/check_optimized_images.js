const http = require('http');

const urls = [
  '/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdm9tmagpg%2Fimage%2Fupload%2Fv1780308287%2Fvygrid%2FWhatsApp_Image_2026-06-01_at_2_05_44_PM-1780308286913.jpg&w=3840&q=75',
  '/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdm9tmagpg%2Fimage%2Fupload%2Fv1780304915%2Fvygrid%2Fgat-1780304915173.png&w=3840&q=75',
  '/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdm9tmagpg%2Fimage%2Fupload%2Fv1780305029%2Fvygrid%2Frex-1780305029658.png&w=3840&q=75',
  '/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdm9tmagpg%2Fimage%2Fupload%2Fv1780305134%2Fvygrid%2FWhatsApp_Image_2026-06-01_at_2_39_18_PM-1780305134014.jpg&w=3840&q=75'
];

function checkOptimized(url) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${url}`, (res) => {
      console.log(`Optimized URL: ${url}\n  Status Code: ${res.statusCode}`);
      resolve();
    }).on('error', (err) => {
      console.log(`Error on: ${url}\n  Error: ${err.message}`);
      resolve();
    });
  });
}

async function run() {
  for (const url of urls) {
    await checkOptimized(url);
  }
}

run();
