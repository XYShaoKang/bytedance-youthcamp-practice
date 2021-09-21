import ejs from 'ejs'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import prettier from 'prettier'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const templatePath = path.join(__dirname, '../template/')
export default function (rootPath, option) {
  Object.keys(templateList).forEach((key) => {
    const filename = templateList[key]
    fs.writeFileSync(
      path.join(rootPath, key),
      createTemplate(filename, option, key),
    )
  })
}

function createTemplate(templateFilename, option, generateFilename) {
  const extname = path.extname(generateFilename)
  let templateStr = fs.readFileSync(
    path.join(templatePath, templateFilename),
    'utf-8',
  )
  const code = ejs.render(templateStr, option, { rmWhitespace: true })
  // return code
  return prettier.format(code, { parser: parsers[extname] })
}

const parsers = {
  '.json': 'json',
  '.js': 'babel',
}

const templateList = {
  'index.js': 'index.ejs',
  'package.json': `package.json.ejs`,
}
