const http = require('http');
const fs = require('fs'); 

const server = http.createServer((request, response) => {

    let file = ''

    if (request.url === '/') {
        file = 'index.html';
    } else if (request.url === '/contato') {
        file = 'contatos.html';
    } else if (request.url === '/social') {
        file = 'social.html';
    } else if (request.url === '/santos') {
        file = 'santos.html';
    } else {
        file = 'erro.html';
    };

    if (fs.existsSync(file)){
        fs.readFile(file, (error, data) => {
            if (error) {
                throw error;
            } else {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(data);
            }
        });

    }

});

server.listen(3000, () => console.log("Servidor rodando na porta 3000"));