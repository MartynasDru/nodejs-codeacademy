const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    switch (req.url) {
        case '/posts':
            res.write(JSON.stringify(['post 1', 'post 2', 'post 3']));
            break;
        case '/users':
            res.write(JSON.stringify(['user 1', 'user 2', 'user 3']));
            break;
        default:
            res.writeHead(400);
    }

    res.end();
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

