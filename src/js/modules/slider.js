export class Slider {
    constructor(page, btns) {
        this.page = document.querySelector(page)
        this.slides = [...this.page.children]
        this.btns = document.querySelectorAll(btns)
        this.slideIndex = 1
    }

    showSlides(numSlide) {
        if (numSlide > this.slides.length) {
            this.slideIndex = 1
        }

        if (numSlide < 1) {
            this.slideIndex = this.slides.length
        }

        this.slides.forEach(slide => {
            slide.style.display = 'none'
        })

        this.slides[this.slideIndex - 1].style.display = 'block'
    }

    plusSlides(numSlide) {
        this.showSlides(this.slideIndex += numSlide)
    }

    render() {
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

        this.showSlides(this.slideIndex)
    }
}