const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    
    if (req.url == '/produto') {
        res.end(JSON.stringify({mensagem: "url de produto"}));
    }
    else
        res.end(JSON.stringify({mensagem : "teste"}));
});

server.listen(port, hostname, () => {
console.log(`Server running at http://${hostname}:${port}/`);
});
