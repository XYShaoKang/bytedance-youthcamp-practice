import { promisify } from 'util'
import downloadOrig from 'download-git-repo'
import ora from 'ora'

const download = promisify(downloadOrig)
export const clone = async function (repo: string, desc: string) {
  const spinner = ora(`下载......${repo}`).start()

  await download(repo, desc, {})

  spinner.color = 'green'
  spinner.text = '下载完成'
  spinner.succeed()
}
