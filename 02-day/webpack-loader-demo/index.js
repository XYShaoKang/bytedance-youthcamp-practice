import { remark } from 'remark'
import remarkHtml from 'remark-html'

export default async function (source) {
  const file = await remark().use(remarkHtml).process(source)
  return `export default \`${String(file)}\``
}
