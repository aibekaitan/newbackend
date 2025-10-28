const http = require('http')
const fs = require('fs')
let requestsCount = 0


const server = http.createServer((request, response) => {
    console.log(request.url)
    if(request.url === '/favicon.ico'){
        const favicon = fs.readFileSync('./favicon.ico');
        response.writeHead(200, {'Content-Type':'image/x-icon'});
        response.end(favicon)
        return
    }
    if(request.url === '/'){
        requestsCount++;
    }

    switch (request.url) {
        case '/students' :
            setTimeout(()=>{
                response.write('Hello')
                response.end();
            },5000)
            // response.write('Students')
            break
        case '/' :
        case '/courses' :
            fs.readFile('pages.html', (err,data)=>{
                if(err){
                    response.write('Error')
                }
                else{
                    response.write(data)
                }
                response.end()
            })
            break
        default:
            response.write('404 Not Found')
            response.end()
    }

    // response.write(' IT-INCUBATOR: ' + requestsCount)
    // response.end()
});

server.listen(3003)