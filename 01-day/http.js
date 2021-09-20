const fs = require('fs')
const path = require('path')
const http = require('http')

const server = http.createServer(async (req, res) => {
  // req,res 居然是流? 是的!
  // res.end('Hello world!')

  const { url, method, headers } = req
  if (url === '/' && method === 'GET') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain;charset=utf-8',
        })
        return
      }
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(data)
    })
  } else if (url === '/users' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify({ name: 'shaokang' }))
  } else if (method === 'GET' && headers.accept.indexOf('image/') !== -1) {
    const rs = fs.createReadStream(path.join(__dirname, url))
    rs.pipe(res)
    rs.on('error', (err) => {
      res.writeHead(404, {
        'Content-Type': 'text/plain;charset=utf-8',
      })
      res.end(err.message.replace(__dirname, ''))
    })
  } else {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(
      '您访问的页面去宇宙流浪了,请访问在家的页面, <a href="/">返回首页</a>',
    )
  }
})

server.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`)
})
