import demo from './demo.json5'

console.log(demo)

const root = document.getElementById('root')
const btn = document.createElement('button')
btn.innerText = 'import foo'
btn.onclick = (e) => {
  // 动态加载 foo,会将 foo 单独打包
  import('./foo').then((module) => {
    const foo = module.default

    foo()
  })
}

root.append(btn)
