import './style.css'

const app = document.getElementById('app')
app.innerText = `0,0`

enableDray(app)
function enableDray(element) {
  let startX = 0,
    startY = 0
  const cache = { x: 0, y: 0 }
  let moveHandle = (e) => {
    let [offsetX, offsetY] = [e.clientX - startX, e.clientY - startY]
    move(offsetX + cache.x, offsetY + cache.y)
  }
  let upHandle = (e) => {
    document.removeEventListener('mousemove', moveHandle)
    document.removeEventListener('mouseup', upHandle)
    let [offsetX, offsetY] = [e.clientX - startX, e.clientY - startY]
    move(offsetX + cache.x, offsetY + cache.y)
    element.style.cursor = 'pointer'

    cache.x += offsetX
    cache.y += offsetY
  }
  element.addEventListener('mousedown', (e) => {
    ;[startX, startY] = [e.clientX, e.clientY]
    document.addEventListener('mousemove', moveHandle)
    document.addEventListener('mouseup', upHandle)
    element.style.cursor = 'move'
  })
  function move(x, y) {
    element.style.transform = `translate(${x}px, ${y}px)`
    element.innerText = `${x},${y}`
  }
}
