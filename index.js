const http = require('http')
const fs = require('fs')
const mimeTypes = require('./mimeTypes')
const path = require('Path')


const PORT = 8080


http
    .createServer(handleRequest) 
    .listen(PORT, function() {
    console.log('you are running on port: ' + PORT)
})

function handleRequest(request, response) {
    let filePath = './'
    console.log(request.url, request.method)
    switch(request.url) {
        case './':
            filePath += 'assets/index.html'
            break
        case "/tacos":
            filePath += "assets/tacos.html";
            break
        case '/assets/style.css':
            filePath += /assets/style.css
            break
        case '/pandas':
            filePath += /assets/taco-crunch.wav
            break
        default: 
            filePath += 'assets/404.html'
            break
    }

    const fileExtension = path.ext(filePath).toLowerCase()
    
    const contentType = mimeTypes[fileExtension] || 'text/html'
/
    fs.readFile(filePath, function(error, content) {
        if (!error){
            response.writeHead(200, {'Content-Type': contentType})
            response.end(content, 'utf-8')
        } else {
            if (error.code === "ENDENT"){
                fs.readFile('./assets/404.html', function(error, content404){
                    response.writeHead(404, { 'Content-Type': contentType})
                    response.end(content404, 'utf-8')
                })

            }else {
                response.writeHead(500)
                response.end('Something is busted 500. Email the admin')
                response.end()
            }
        }
    })
}
