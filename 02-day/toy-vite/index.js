const Koa = require('koa')
const fs = require('fs')
const path = require('path')

const app = new Koa()

const ROOT_PATH = path.join(__dirname, './')

app.use((ctx) => {
  const url = ctx.request.url
  if (url === '/') {
    ctx.type = 'text/html; charset=UTF-8'
    ctx.body = fs.createReadStream(path.join(ROOT_PATH, './index.html'))
  } else if (url.endsWith('.js')) {
    const sourcePath = path.join(ROOT_PATH, url)
    const source = fs.readFileSync(sourcePath, 'utf-8')

    ctx.type = 'text/javascript'
    ctx.body = rewriteImport(source)
  } else if (url.startsWith('/@modules/')) {
    const moduleName = url.replace('/@modules', '')
    const prefix = path.join(__dirname, './node_modules/', moduleName)
    const module = require(path.join(prefix, '/package.json')).module
    const source = fs.readFileSync(path.join(prefix, module), 'utf-8')

    ctx.type = 'text/javascript'
    ctx.body = rewriteImport(source)
  }
})

app.listen(3000, () => {
  console.log('Server run on http://localhost:3000')
})

function rewriteImport(source) {
  return source
    .replace(/(from\s["'])(?![\.\/])/g, '$1/@modules/')
    .replace(/process\.env\.NODE_ENV/g, `'development'`)
}
