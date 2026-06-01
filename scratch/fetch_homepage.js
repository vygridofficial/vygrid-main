const http = require('http');

http.get('http://localhost:3000/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log("Status Code:", res.statusCode);
    
    // Find all images in the HTML
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    let match;
    console.log("Images found on homepage HTML:");
    while ((match = imgRegex.exec(data)) !== null) {
      console.log(match[1]);
    }
  });
}).on('error', (err) => {
  console.error("Error fetching homepage:", err.message);
});
