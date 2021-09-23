import { enableLoginTab } from './gesture'
import { GestureEvent } from './types/global'

class Carousel {
  imgList: HTMLElement
  dots: HTMLElement[]
  x = 0 // 当前幻灯片的横轴位置
  startX = 0 // 开始滑动时的位置
  index = 0 // 当前应该选中第几张
  isMove = false // 区分左右上下移动
  viewWidth: number // 幻灯片宽度
  imgslen: number // 幻灯片中的图片数量,包括无缝连接添加的图片
  animateTimer: number | undefined
  autoTimer: number | undefined
  constructor(opts: { imgList: HTMLElement; dots: HTMLElement[] }) {
    const { imgList, dots } = opts
    this.imgList = imgList
    this.dots = dots
    this.viewWidth = this.imgList.clientWidth
    enableLoginTab(imgList)
    this.initLayout()
    this.imgslen = this.imgList.children.length
    imgList.addEventListener('start', (e) => {
      this.start(e)
    })
    imgList.addEventListener('panstart', (e) => {
      this.panstart(e)
    })
    imgList.addEventListener('pan', (e) => {
      this.pan(e)
    })
    imgList.addEventListener('panend', (e) => {
      this.panend(e)
    })
    imgList.addEventListener('end', (e) => {
      // 防止在动画的过程中,快速按下和放开之后,动画停止
      this.panend(e)
      // 重新开始自动播放
      this.autoPlayer()
    })

    this.autoPlayer()
  }

  // 初始化布局,添加无线轮播的头尾图片
  initLayout() {
    const imgs = this.imgList.children
    const firstImg = imgs[0]
    const lastImg = imgs[imgs.length - 1]
    this.imgList.insertBefore(lastImg.cloneNode(true), firstImg)
    this.imgList.append(firstImg.cloneNode(true))
    this.x = -this.viewWidth
    this.index = 1
    this.setTransfrom()
  }
  // 调整布局,无缝轮播
  resetLayout() {
    let disX = -this.index * this.viewWidth - this.x
    if (this.index === 0) {
      this.index = this.imgslen - 2
    } else if (this.index === this.imgslen - 1) {
      this.index = 1
    }
    this.x = -this.index * this.viewWidth + disX
    this.setTransfrom()
  }

  start(e: GestureEvent) {
    clearInterval(this.animateTimer)
    clearInterval(this.autoTimer)
  }
  panend(e: GestureEvent) {
    this.index = Math.round(-this.x / this.viewWidth)
    const targetX = -this.index * this.viewWidth
    this.setTransfrom()

    this.animate(targetX)
    this.setNavs()
  }
  pan(e: GestureEvent) {
    if (this.isMove) {
      e.stop()
      const disX = e.clientX - e.startX
      this.x = this.startX + disX
      this.setTransfrom()
    }
  }
  panstart(e: GestureEvent) {
    const disX = Math.abs(e.clientX - e.startX)
    const disY = Math.abs(e.clientY - e.startY)

    if (disX > disY) {
      e.stop()
      this.isMove = true
    } else {
      this.isMove = false
    }

    if (this.index === 0 || this.index === this.imgslen - 1) {
      this.resetLayout()
    }

    this.startX = this.x
  }

  setTransfrom() {
    this.imgList.style.transform = `translate3d(${this.x}px,0,0)`
  }
  setNavs() {
    const curIndex =
      this.index > 0
        ? (this.index - 1) % this.dots.length
        : this.dots.length - 1

    this.dots.forEach((dot, i) => {
      if (curIndex === i) {
        dot.classList.add('active')
      } else {
        dot.classList.remove('active')
      }
    })
  }
  animate(targetX: number) {
    if (Math.abs(targetX - this.x) < 20) {
      this.x = targetX
      this.setTransfrom()
    } else {
      let t = 0
      const b = this.x
      const c = targetX - this.x
      const time = Math.abs(c)
      const intervl = 1000 / 60
      const d = Math.ceil(time / intervl)
      clearInterval(this.animateTimer)
      this.animateTimer = setInterval(() => {
        t++
        if (t >= d) {
          clearInterval(this.animateTimer)
        }
        this.x = this.easeOut(t, b, c, d)
        this.setTransfrom()
      }, intervl)
    }
  }
  /**
   * tween 动画算法
   * @param t current time(当前时间)
   * @param b beginning value (初始值)
   * @param c change in value (变化量)
   * @param d duration (持续时间)
   * @returns {number}
   */
  easeOut(t: number, b: number, c: number, d: number) {
    return -c * (t /= d) * (t - 2) + b
  }
  autoPlayer() {
    clearInterval(this.autoTimer)
    this.autoTimer = setInterval(() => {
      if (this.index === this.imgslen - 1) {
        this.resetLayout()
      }
      this.index++
      this.animate(-this.index * this.viewWidth)
      this.setNavs()
    }, 3000)
  }
}
export default Carousel
