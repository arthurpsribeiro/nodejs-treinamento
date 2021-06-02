// exemplo de um servidor de páginas 

const http = require('http');

const server = http.createServer(
    (request, response) => {

        response.writeHead(200 /*status sucesso */, {'Content-Type': 'text/html'});

        // tenho a string da URL da requisição
        response.write('<head><meta charset="UTF-8"></head>');
        if (request.url === '/'){
            response.write('<h1> Página do Arthur</h1>');
            response.write('<ul>');
            response.write('<li><a href="/">HOME</a></li>');
            response.write('<li><a href="/artigos">ARTIGOS</a></li>');
            response.write('<li><a href="/contato">CONTATO</a></li>');
            response.write('</ul>');
        } else if (request.url === '/artigos') {
            response.write('<h1> Artigos do Arthur</h1>');
            response.write('<ul>');
            response.write('<li>Artigo 1</li>');
            response.write('<li>Artigo 2</li>');
            response.write('</ul>');
            response.write('</br>');
            response.write('<a href="/">HOME</a>');
        } else if (request.url === '/contato') {
            response.write('<h1>Contatos do Arthur</h1>');
            response.write('<ul>');
            response.write('<li>Contato 1</li>');
            response.write('<li>Contato 2</li>');
            response.write('</ul>');
            response.write('</br>');
            response.write('<a href="/">HOME</a>');
        } else {
            response.write('<h1>Página não encontrada!</h1>');
            response.write('<a href="/">HOME</a>');
        };
        response.end();

});

server.listen(3000, () => console.log("Servidor está rodando na porta 3000"))