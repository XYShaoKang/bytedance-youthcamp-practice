interface Context {
  startX: number
  startY: number
  isTap: boolean
  isPan: boolean
  isPress: boolean
  timoutHandler: ReturnType<typeof setTimeout>
  stop: () => void
}

/**
 * 自定义事件列表
 * - start
 * - pan
 *   - panstart
 *   - pan
 *   - panend
 * - press
 *   - pressstart
 *   - presscencel
 *   - pressend
 * - tap
 * - end
 *
 * @param {HTMLElement} ele
 */

export function enableLoginTab(ele: HTMLElement) {
  const contexts = new Map<symbol | number, Context>()
  const MOUSE_TYPE = Symbol('mouse')
  if (!('ontouchstart' in document)) {
    ele.addEventListener('mousedown', (e) => {
      const move = (event: MouseEvent) => {
        const context = contexts.get(MOUSE_TYPE)
        if (!context) throw new Error('unknow context')
        const stop = () => {
          event.preventDefault()
        }
        context.stop = stop

        onMove(event, context)
      }
      const end = (event: MouseEvent) => {
        const context = contexts.get(MOUSE_TYPE)
        if (!context) throw new Error('unknow context')

        onEnd(event, context)

        document.removeEventListener('mousemove', move)
      }
      const context = Object.create(null)
      contexts.set(MOUSE_TYPE, context)

      onStart(e, context)
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', end, { once: true })
    })
  } else {
    ele.addEventListener('touchstart', (event) => {
      for (const touch of Array.from(event.changedTouches)) {
        const context = Object.create(null)
        contexts.set(touch.identifier, context)
        onStart(touch, context)
      }
    })
    ele.addEventListener('touchmove', (event) => {
      for (const touch of Array.from(event.changedTouches)) {
        const context = contexts.get(touch.identifier)
        if (!context) throw new Error('unknow context')

        const stop = () => {
          event.preventDefault()
        }
        context.stop = stop
        onMove(touch, context)
      }
    })
    ele.addEventListener('touchend', (e) => {
      for (const touch of Array.from(e.changedTouches)) {
        const context = contexts.get(touch.identifier)
        if (!context) throw new Error('unknow context')
        onEnd(touch, context)
        contexts.delete(touch.identifier)
      }
    })
  }

  const onStart = (event: Touch | MouseEvent, context: Context) => {
    ele.dispatchEvent(
      Object.assign(new CustomEvent('start'), {
        clientX: event.clientX,
        clientY: event.clientY,
      }),
    )
    context.startX = event.clientX
    context.startY = event.clientY
    context.isTap = true
    context.isPan = false
    context.isPress = false

    clearTimeout(context.timoutHandler)
    context.timoutHandler = setTimeout(() => {
      if (context.isPan) {
        return
      }
      context.isTap = false
      // context.isPan = false
      context.isPress = true
      ele.dispatchEvent(
        Object.assign(new CustomEvent('pressstart'), {
          clientX: event.clientX,
          clientY: event.clientY,
          stop: context.stop,
        }),
      )
    }, 500)
  }
  const onMove = (event: Touch | MouseEvent, context: Context) => {
    const dx = event.clientX - context.startX,
      dy = event.clientY - context.startY

    if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
      context.isPan = true
      if (context.isPress) {
        ele.dispatchEvent(
          Object.assign(new CustomEvent('presscencel'), {
            clientX: event.clientX,
            clientY: event.clientY,
          }),
        )
      }

      context.isTap = false
      context.isPress = false
      clearTimeout(context.timoutHandler)
      ele.dispatchEvent(
        Object.assign(new CustomEvent('panstart'), {
          clientX: event.clientX,
          clientY: event.clientY,
          startX: context.startX,
          startY: context.startY,
          stop: context.stop,
        }),
      )
    }
    if (context.isPan) {
      ele.dispatchEvent(
        Object.assign(new CustomEvent('pan'), {
          clientX: event.clientX,
          clientY: event.clientY,
          startX: context.startX,
          startY: context.startY,
          stop: context.stop,
        }),
      )
    }
  }
  const onEnd = (event: Touch | MouseEvent, context: Context) => {
    clearTimeout(context.timoutHandler)
    if (context.isPan) {
      ele.dispatchEvent(
        Object.assign(new CustomEvent('panend'), {
          clientX: event.clientX,
          clientY: event.clientY,
          startX: context.startX,
          startY: context.startY,
        }),
      )
      context.isPan = false
    }
    if (context.isTap) {
      ele.dispatchEvent(
        Object.assign(new CustomEvent('tap'), {
          clientX: event.clientX,
          clientY: event.clientY,
        }),
      )
      context.isTap = false
    }
    if (context.isPress) {
      ele.dispatchEvent(
        Object.assign(new CustomEvent('pressend'), {
          clientX: event.clientX,
          clientY: event.clientY,
        }),
      )
      context.isPress = false
    }
    ele.dispatchEvent(
      Object.assign(new CustomEvent('end'), {
        clientX: event.clientX,
        clientY: event.clientY,
      }),
    )
  }
}
