const fs = require('fs')
const path = require('path')
const { readFile } = require('fs').promises

// 异步
// fs.readFile
// fs.readFile('./fs.js', (err, data) => {
//   if (err) {
//     throw err
//   }
//   console.log(data.toString())
// })

// 同步读取 二进制文件 图片 视频
// const data = fs.readFileSync(path.join(__dirname, './fs.js'), 'utf-8')
// console.log(data)

// 使用 Promise 版本
void (async function () {
  const data = await readFile(path.join(__dirname, './fs.js'), 'utf-8')
  console.log(data)
})()
