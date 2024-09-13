- var http = require('http');
var fs = require('fs');
var qs = require('querystring');
http.createServer(function (req, res) {
 if (req.method === 'GET') {
 // Serve the form HTML file
 fs.readFile('index.html', 'utf8', function (err, data) {
 if (err) { 
 res.writeHead(404, {'Content-Type': 'text/html'});
 res.write("Error: File not found");
 return res.end();
 } 
 res.writeHead(200, {'Content-Type': 'text/html'});
 res.write(data);
 return res.end();
 });
 } else if (req.method === 'POST') {
 // Collect form data
 let body = '';
 req.on('data', function (chunk) {
 body += chunk;
 });
 
 req.on('end', function () {
 // Parse the form data
 let formData = qs.parse(body);
 
 // Log the form data to the console
 console.log("Form Data Received:");
 console.log("First Name:", formData.fname);
 console.log("Last Name:", formData.lname);
 console.log("Email:", formData.email);
 console.log("Message:", formData.message);
 
 // Create a string to write to the text file
 let outputData = `First Name: ${formData.fname}\nLast Name: 
${formData.lname}\nEmail: ${formData.email}\nMessage: ${formData.message}\n\n`;
 // Write the data to a text file
 fs.writeFile('data.txt', outputData, function (err) {
 if (err) {
 res.writeHead(500, {'Content-Type': 'text/html'});
 res.write("Error: Unable to save data");
 return res.end();
 }
 // Send a response back to the client
 res.writeHead(200, {'Content-Type': 'text/html'});
 res.write("<h2>Form data saved successfully!</h2>");
 return res.end();
 });
 });
 }
}).listen(8080);
console.log('Server running at http://localhost:8080/');
