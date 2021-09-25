import { effect } from './util'

function h(tag, props, children) {
  return {
    tag,
    props,
    children,
  }
}

const Vue = {
  createRenderer({ querySelector, insert, createElement, remove }) {
    // 返回渲染器
    return {
      createApp(options) {
        return {
          /**
           * 1. 找到宿主元素
           * 2. 渲染页面
           *     1. 处理 template: 编译
           *     2. 用户直接编写 render
           * 3. 追加到宿主
           */
          mount(selector) {
            // 1. 找到宿主元素
            const parent = querySelector(selector)

            // 2. 渲染页面
            if (!options.render) {
              // 2.1 处理 template: 编译
              options.render = this.compile(parent.innerHTML)
            }
            if (options.setup) {
              this.setupState = options.setup()
            }
            if (options.data) {
              this.data = options.data()
            }

            // setup 和其他选项
            const proxy = new Proxy(this, {
              get(target, key) {
                // 先从 setup 中取,如果取不到,再从 data 中取
                if (target.setupState && key in target.setupState) {
                  return target.setupState[key]
                } else {
                  return target.data[key]
                }
              },
              set(target, key, val) {
                if (target.setupState && key in target.setupState) {
                  target.setupState[key] = val
                } else {
                  target.data[key] = val
                }
                this.update()
              },
            })

            this.update = effect(() => {
              // 2.2 用户直接编写 render
              // const el = options.render.call(proxy)

              // // 3. 追加到宿主
              // parent.innerHTML = ''
              // insert(el, parent)

              const vnode = options.render.call(proxy)

              // 转换 vnode 为 dom
              // 初始化创建整棵树
              if (!this.isMounted) {
                //  实现 createElm, 整体创建
                const el = this.createElm(vnode)
                parent.innerHTML = ''
                insert(el, parent)

                //init
                this.isMounted = true
              } else {
                // todo: update

                // this.patch(old,newNode)
                this.patch(this._vnode, vnode)
              }
              this._vnode = vnode
            })
          },
          patch(n1, n2) {
            const el = (n2.el = n1.el)

            // 1. 更新: 必须更新相同节点
            //
            if (n1.tag === n2.tag && n1.key === n2.key) {
              // update
              const oldCh = n1.children
              const newCh = n2.children
              if (typeof oldCh === 'string') {
                if (typeof newCh === 'string') {
                  // text update
                  if (oldCh !== newCh) {
                    el.textContent = newCh
                  }
                } else {
                  // 替换文本为一组子元素
                  el.textContent = ''
                  newCh.forEach((child) => insert(this.createElm(child), el))
                }
              } else {
                if (typeof newCh === 'string') {
                  el.textContent = newCh
                } else {
                  this.updateChildren(el, newCh, oldCh)
                }
              }
            } else {
              // replace
            }
          },
          updateChildren(el, newCh, oldCh) {
            // 1. 获取 newCh 和 oldCh 中较短的那个
            const len = Math.min(oldCh.length, newCh.length)
            // 强制更新
            for (let i = 0; i < len; i++) {
              this.patch(oldCh[i], newCh[i])
            }
            // 处理剩余
            // 新数组元素多
            if (newCh.length > oldCh.length) {
              // 批量创建并追加
              // 截取 newCh 中 len 后面的部分
              newCh
                .slice(len)
                .forEach((child) => insert(this.createElm(child), el))
            } else if (newCh.length < oldCh.length) {
              // 批量删除多余
              oldCh.slice(len).forEach((child) => remove(child.el, el))
            }
          },
          createElm(vnode) {
            const { tag, props, children } = vnode
            // 遍历 vnode,创建整棵树
            const el = createElement(tag)
            // 如果存在属性,就设置它们
            if (props) {
              for (const key in props) {
                if (Object.hasOwnProperty.call(props, key)) {
                  const element = props[key]
                }
              }
            }

            // 递归
            if (typeof children === 'string') {
              el.textContent = children
            } else {
              for (const child of children) {
                insert(this.createElm(child), el)
              }
            }

            vnode.el = el
            return el
          },
          compile(template) {
            // 返回一个 render 函数
            // parse -> ast
            // generate -> ast=>render
            return function render() {
              // const h3 = document.createElement('h3')
              // h3.textContent = this.title
              // return h3
              if (Array.isArray(this.title)) {
                return h(
                  'h3',
                  null,
                  this.title.map((s) => h('p', null, s)),
                )
              } else {
                return h('h3', null, this.title)
              }
              // return h('h3', null, [
              //   h('p', null, this.title),
              //   h('p', null, this.title),
              //   h('p', null, this.title),
              // ])
            }
          },
        }
      },
    }
  },
  createApp(options) {
    // 创建一个 web 平台特有的渲染器
    const renderer = Vue.createRenderer({
      querySelector(sel) {
        return document.querySelector(sel)
      },
      insert(el, parent) {
        parent.appendChild(el)
      },
      createElement(tag) {
        return document.createElement(tag)
      },
      remove(el, parent) {
        parent.removeChild(el)
      },
    })
    return renderer.createApp(options)
  },
}

export default Vue
