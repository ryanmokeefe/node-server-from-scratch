const http      = require('http')
const fs        = require('fs')
const path      = require('path')
const mimeTypes = require('./mimeTypes')

const PORT = 8125

http
  .createServer(requestHandler)
  .listen(PORT, () => console.log(`Server running at http://127.0.0.1:${PORT}/`))

function requestHandler (request, response) {
  let filePath = './'
  
  // URL Routing
  switch (request.url) {
    case '/': 
      filePath += 'assets/index.html'
      break
    case '/tacos': 
      console.log('tacos')
      filePath += 'assets/tacos.html'
      break
    case '/tacosound': 
      filePath += 'assets/taco-crunch.wav'
      break
    case '/assets/style.css': 
      filePath += "assets/style.css"
      break
    default:
      filePath += '404.html'
      break
  }

  // obtain the file extension using the path dependency
  const fileExtension = path.extname(filePath).toLowerCase()

  // Defines the content type of the file being transmitted back to the browser
  // This information lives on the header
  // let contentType = 'text/html'

  // Sets the content type to one of the types defined above or if it isn't found
  // 
  let contentType = mimeTypes[fileExtension] || "text/html"

  // will attempt to 
  fs.readFile(filePath, function (error, content) {
    if (!error) {
      response.writeHead(200, {'Content-Type': contentType})
      response.end(content, 'utf-8')
    } else {
      // Error NO ENTity (ENOENT), meaning 'no such file'
      if (error.code === 'ENOENT') {
        fs.readFile('./assets/404.html', function (error, fileContent404) {

          //write the type of file content to the response header
          response.writeHead(404, {'Content-Type': contentType})
          
          // writes content to the response body
          response.end(fileContent404, 'utf-8')
        })
      } else {
        response.writeHead(500)
        response.end(`Sorry, check with the site admin for error: ${error.code}...\n`)
        response.end()
      }
    }
  })
}
