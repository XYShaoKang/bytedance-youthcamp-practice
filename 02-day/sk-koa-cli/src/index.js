/**
 * 1. 创建项目文件夹
 * 2. 导入模板
 * 3. 安装依赖
 */

import fs from 'fs'
import path from 'path'
import rimrafOrig from 'rimraf'
import { promisify } from 'util'
import inquirer from 'inquirer'
import execa from 'execa'

import createTemplate from './createTemplate.js'

const rimraf = promisify(rimrafOrig)

void (async function () {
  const result = await inquirer.prompt([
    { type: 'input', name: 'projectName', message: 'Project Name' },
    {
      type: 'number',
      name: 'port',
      message: 'Set port number',
      default: () => 8080,
    },
    {
      type: 'checkbox',
      name: 'middleware',
      message: 'middleware',
      choices: [{ name: 'koaRouter', checked: true }, { name: 'koaStatic' }],
    },
  ])
  const option = {
    packageName: result.projectName,
    port: result.port,
    middleware: {
      router: result.middleware.indexOf('koaRouter') !== -1,
      static: result.middleware.indexOf('koaStatic') !== -1,
    },
  }

  // 1. 创建项目文件夹

  const rootPath = path.join(process.cwd(), result.projectName)
  await rimraf(rootPath)

  fs.mkdirSync(rootPath)

  // 2. 复制模板
  createTemplate(rootPath, option)

  // 3. 安装依赖

  await execa('pnpm', ['install'], {
    cwd: rootPath,
    stdio: [2, 2, 2],
  })
})()
