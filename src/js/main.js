import { Slider } from './modules/index'
import { VideoPlayer } from './modules/index'

window.addEventListener('DOMContentLoaded', () => {
    const slider = new Slider('.page', '.next')
    slider.render()

    const player = new VideoPlayer('.showup .play', '.overlay')
    player.init()
})