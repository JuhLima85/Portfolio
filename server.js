const http = require('http');
const path = require('path');
const fs = require('fs');

const publicPath = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
    const filePath = path.join(publicPath, req.url === '/' ? 'index.html' : req.url);
    const extname = path.extname(filePath);
    const contentType = getContentType(extname) || 'text/html';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('404 - Not Found');
            } else {
                res.writeHead(500);
                res.end('500 - Internal Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

function getContentType(extname) {
    switch (extname) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        case '.json':
            return 'application/json';
        case '.png':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.gif':
            return 'image/gif';
        default:
            return null;
    }
}

const port = 3000;
server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
