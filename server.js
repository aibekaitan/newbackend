const http = require('http')
const fs = require('fs')
let requestsCount = 0

const delay = (ms)=>{
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            resolve()
        },ms)
    })
}
const readFile = (path)=>{
    return new Promise((resolve, reject)=>{
        fs.readFile(path, (err,data)=>{
            if(err){
                reject('Error')
            }
            else{
                resolve(data)
            }

        })
    })
}


const server = http.createServer(async (request, response) => {
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
            await delay(3000)
            response.write('Students')
            response.end();

            break
        case '/' :
        case '/courses' :
            try {
                const data = await readFile('pages.html')
                response.write(data)
                response.end()
            }
            catch(err){
                response.write('something wrong, 500')
                response.end()
            }
            break
        default:
            // throw new Error('Что-то пошло не так!');
            response.write('404 Not Found')
            response.end()
    }

    // response.write(' IT-INCUBATOR: ' + requestsCount)
    // response.end()
});

server.listen(3003)