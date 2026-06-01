const http = require('http');

function checkPath(pathName) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${pathName}`, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log(`\n--- Checking ${pathName} ---`);
        console.log("Response status:", res.statusCode);
        
        const regex = /\/portfolio\/[a-zA-Z0-9_-]+/g;
        const matches = data.match(regex) || [];
        const uniqueMatches = Array.from(new Set(matches));
        console.log(`Unique portfolio links on ${pathName}:`, uniqueMatches);
        resolve();
      });
    }).on('error', (err) => {
      console.error(`HTTP error on ${pathName}:`, err.message);
      resolve();
    });
  });
}

async function run() {
  await checkPath('/');
  await checkPath('/portfolio');
}

run().then(() => process.exit(0));
