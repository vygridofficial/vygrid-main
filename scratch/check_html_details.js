const http = require('http');

http.get('http://localhost:3000/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    // Find the Selected Cases section
    const startIdx = data.indexOf('Selected Cases');
    if (startIdx !== -1) {
      // Find the container element after Selected Cases
      const containerIdx = data.indexOf('w-full flex overflow-x-auto', startIdx);
      if (containerIdx !== -1) {
        // Let's print the contents of the container
        const closingDivIdx = data.indexOf('</section>', containerIdx);
        const containerHTML = data.substring(containerIdx, closingDivIdx);
        console.log("CONTAINER HTML:");
        console.log(containerHTML);
      } else {
        console.log("Could not find the project list container!");
      }
    } else {
      console.log("Could not find 'Selected Cases' heading!");
    }
  });
});
