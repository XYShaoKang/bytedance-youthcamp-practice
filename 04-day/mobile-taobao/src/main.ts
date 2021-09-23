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
