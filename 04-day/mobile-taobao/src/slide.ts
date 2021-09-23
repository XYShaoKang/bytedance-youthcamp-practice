import Carousel from './Carousel'

const slideImgUrls = [
  './assets/banner.png',
  './assets/a.jpg',
  './assets/b.jpg',
  './assets/c.jpg',
  './assets/d.jpg',
]
function initSlide() {
  const slide = document.getElementById('slide')
  if (!slide) return
  const dots = document.getElementById('dot')
  const dotList: HTMLLIElement[] = []
  for (const url of slideImgUrls) {
    const item = document.createElement('li')
    item.innerHTML = `
    <img src="${url}" alt="banner" draggable="false" />
    `
    slide?.append(item)
    const dot = document.createElement('li')
    dots?.append(dot)
    dotList.push(dot)
  }

  dotList[0].classList.add('active')
  new Carousel({ imgList: slide, dots: dotList })
}

export { initSlide }
