import './style.css'
import { initSlide } from './slide'

initSlide()
function initMyBrand() {
  const data = [
    { imgSrc: './assets/diannao.png', title: 'Apple' },
    { imgSrc: './assets/diannao.png', title: 'Apple' },
    { imgSrc: './assets/diannao.png', title: 'Apple' },
    { imgSrc: './assets/diannao.png', title: 'Apple' },
    { imgSrc: './assets/diannao.png', title: 'Apple' },
    { imgSrc: './assets/diannao.png', title: 'Apple' },
    { imgSrc: './assets/diannao.png', title: 'Apple' },
    { imgSrc: './assets/diannao.png', title: 'Apple' },
    { imgSrc: './assets/diannao.png', title: 'Apple' },
    { imgSrc: './assets/diannao.png', title: 'Apple' },
  ]
  const mybrandBody = document.querySelector('.mybrand-body')

  data.forEach(({ imgSrc, title }) => {
    const item = document.createElement('li')
    item.innerHTML = `
      <div>
        <img src="${imgSrc}" alt="${title}" />
      </div>
      <span>${title}</span>
    `
    mybrandBody?.append(item)
  })
}
initMyBrand()

window.onscroll = function () {
  const scrollTop = document.documentElement.scrollTop
  const viewHeight = document.body.clientHeight
  const scrollHeight = document.documentElement.scrollHeight

  const progressbar = document.getElementById('progressbar')
  const progressroot = document.getElementById('progressroot')

  if (!progressroot || !progressbar) {
    return
  }
  const rootHeight = progressroot.clientHeight
  if (scrollTop > rootHeight) {
    progressroot.style.opacity =
      '' + Math.min((scrollTop - rootHeight) / (rootHeight * 2), 1)
  } else {
    progressroot.style.opacity = '0'
  }

  progressbar.style.width =
    (scrollTop / (scrollHeight - viewHeight)) * 100 + '%'
}
