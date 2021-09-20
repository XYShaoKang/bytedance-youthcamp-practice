// 读文件列表
// 拼代码 模板渲染的方式

const fs = require('fs')
const handlebars = require('handlebars')
const chalk = require('chalk')

module.exports = async () => {
  // 读取列表
  const list = fs
    .readdirSync('./src/views')
    .filter((v) => v !== 'Home.vue')
    .map((v) => ({
      name: v.replace('.vue', '').toLowerCase(),
      file: v,
    }))
}

function compile(meta, filePath, templatePath) {
  if (fs.existsSync(templatePath)) {
    const content = fs.readFileSync(templatePath).toString('utf-8')
  }
}
