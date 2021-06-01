//exemplo servidor http
const http = require('http');


//criando servidor http
const server = http.createServer(
    (request, response) => {
        
        //interpretando os dados da url da requisicao
        const url = new URL(request.url, 'http://localhost:3000/');
        console.log(url);

        const searchParams = new URLSearchParams(url.searchParams);
        console.log(searchParams);

        response.write('<head><meta charset="UTF-8"></head>')
        response.write('<h1>Consulta de Pontos</h1>');
        response.write(`<h3> ${request.url} </h3>`);
        response.write(`<br>`);
        response.write(`<h3> ${searchParams} </h3>`);
        searchParams.forEach((valor,chave) => {
            response.write(`<br>`);
            response.write(`<h3> ${chave}: ${valor} </h3>`);
            });

        response.end();
    }
);

//subindo o servidor
server.listen(3000 /*porta http*/, () => console.log('Servidor rodando na porta 3000'));

// localhost:3000/consulta-ponto?nome-jogador=Gabigol

