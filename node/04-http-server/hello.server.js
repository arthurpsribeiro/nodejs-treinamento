//exemplo servidor http
const http = require('http');


//criando servidor http
const server = http.createServer(
    (request, response) => {
        console.log(request);
        console.log(response);

        response.write('<head><meta charset="UTF-8"></head>')
        response.write('<h1>Olá, enfermeira!</h1>');
        response.end();
    }
);

//subindo o servidor
server.listen(3000 /*porta http*/, () => console.log('Servidor rodando na porta 3000'));

