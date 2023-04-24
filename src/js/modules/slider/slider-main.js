import { Slider } from "./slider";

export class MainSlider extends Slider {
    constructor(btns) {
        super(btns)
    }

    showSlides(numSlide) {
        if (numSlide > this.slides.length) {
            this.slideIndex = 1
        }

        if (numSlide < 1) {
            this.slideIndex = this.slides.length
        }

        try {
            this.hanson.style.opacity = '0'

            if (numSlide === 3) {
                this.hanson.classList.add('animated')
                setTimeout(() => {
                    this.hanson.style.opacity = '1'
                    this.hanson.classList.add('slideInUp')
                }, 3000)
            } else {
                this.hanson.classList.remove('slideInUp')
            }
        } catch (error) { }

        Array.from(this.slides).forEach(slide => {
            slide.style.display = 'none'
        })

        this.slides[this.slideIndex - 1].style.display = 'block'
    }

    plusSlides(numSlide) {
        this.showSlides(this.slideIndex += numSlide)
    }

    bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.plusSlides(1)
            })

            btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault()
                this.slideIndex = 1
                this.showSlides(this.slideIndex)
            })
        })

        document.querySelectorAll('.prevmodule').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation()
                e.preventDefault()
                this.plusSlides(-1)
            })
        })

        document.querySelectorAll('.nextmodule').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation()
                e.preventDefault()
                this.plusSlides(1)
            })
        })
    }

    render() {
        if (this.container) {
            try {
                this.hanson = document.querySelector('.hanson')
            } catch (error) { }
            this.showSlides(this.slideIndex)
            this.bindTriggers()
        }
    }
}
