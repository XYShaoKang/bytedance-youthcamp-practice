import path from 'path'
import fs from 'fs'
import { promisify } from 'util'
import figletOrig from 'figlet'
import clear from 'clear'
import chalk from 'chalk'
import { spawn as spawnOrig } from 'child_process'
import ora from 'ora'
import { prompt } from 'enquirer'
import rimrafOrig from 'rimraf'

import { clone } from './download'

const figlet = promisify<string, string | undefined>(figletOrig)
const rimraf = promisify(rimrafOrig)
const log = (content: string) => console.log(chalk.green(content))

const spawn = async (...args: Parameters<typeof spawnOrig>) => {
  return new Promise((resolve) => {
    const proc = spawnOrig(...args)
    proc.stdout?.pipe(process.stdout)
    proc.stderr?.pipe(process.stderr)
    proc.on('close', () => {
      resolve('')
    })
  })
}

export default async (name: string) => {
  // 打印欢迎界面
  name = name || 'template'
  clear()
  const data = await figlet('INIT')
  log(data ?? '')

  const templatePath = path.join(process.cwd(), name)
  console.log(templatePath, fs.existsSync(templatePath))
  if (fs.existsSync(templatePath)) {
    const { remove } = await prompt<{ remove: boolean }>({
      type: 'confirm',
      name: 'remove',
      message: '文件夹已存在,是否删除?',
    })
    if (remove) {
      await rimraf(templatePath)
    } else {
      return
    }
  }

  // 项目模板
  log(`创建项目: ${name}`)
  await clone('github:su37josephxia/vue-template', name)
  // 下载依赖
  // 子进程
  const spinner = ora({ text: `安装依赖...` }).start()
  await spawn('pnpm', ['install'], { cwd: `./${name}` })
  spinner.color = 'green'
  spinner.text = '安装完成'
  spinner.succeed()
}
