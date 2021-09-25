// 能够拦截用户对代理对象的访问
// 从而在值发生变化的时候做出响应式
export function reactive(obj) {
  // Vue2
  // Object.DefineProperty(obj,{})
  // 缺点:
  // 1. 每次只能定义一个 key,需要递归去定义嵌套的 key
  // 2. 数组的处理
  // 3. api 影响: 动态属性新增删除 Vue.delete/set
  // Vu3
  // 1. class collection
  // 2. 兼容性: Vue 2.7

  return new Proxy(obj, {
    get(target, key) {
      console.log('get key:', key)
      track(target, key)
      return target[key]
    },
    set(target, key, val) {
      console.log('set key:', key)
      target[key] = val
      // 通知更新
      // app.update()
      trigger(target, key)
      return true
    },
  })
}
// 建立映射关系: 依赖 dep - 组件更新函数
// Vue2: 组件有 watcher
// Vue3: 创建 map 结构{ target: { key: [update1,update2]}}
const targetMap = new Map()
// 调用 effect, 首先执行 fn
const effectStack = []
export function effect(fn) {
  const eff = function () {
    try {
      effectStack.push(eff)
      fn()
    } finally {
      effectStack.pop()
    }
  }
  eff()
  return eff
}
//  建立 target,key和effectStack中存储的副作用函数之间的关系
function track(target, key) {
  const effect = effectStack[effectStack.length - 1]
  let map = targetMap.get(target)
  if (!map) {
    map = {}
    targetMap.set(target, map)
  }

  if (!map[key]) map[key] = new Set()

  map[key].add(effect)
}

function trigger(target, key) {
  const map = targetMap.get(target)
  if (map) {
    const deps = map[key]
    if (deps) {
      deps.forEach((dep) => dep())
    }
  }
}
