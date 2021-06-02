const http = require('http');
const fs = require('fs');

const server = http.createServer(
    (request, response) => {

        let arquivo = ''

        if (request.url === '/'){
            arquivo = 'index.html';
        } else if (request.url === '/artigos') {
            arquivo = 'artigos.html';
        } else if (request.url === '/contato') {
            arquivo = 'contatos.html';
        } else {
            arquivo = 'erro.html';
        };

        // funcao existsSync() verifica se o arquivo existe, de forma síncrona
        if (fs.existsSync(arquivo)){
            fs.readFile(arquivo, (error, data) => {
                if (error) {
                    throw error;
                } else {
                    response.writeHead(200 /*status sucesso */, {'Content-Type': 'text/html'});
                    // response.write(data); 
                    response.end(data); //quando tudo já estiver em somente um objeto
                }
            });
        } else {
            response.writeHead(500, {'Content-Type': 'text/html'});
            response.write(`Arquivo ${arquivo} não enconrado...`)
            response.end();
        }

        
});

server.listen(3000, () => console.log("Servidor está rodando na porta 3000"))