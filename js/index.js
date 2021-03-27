import {
    createSlider
} from './slider';
window.addEventListener('DOMContentLoaded', function () {
    createSlider({
        parent: ".slider__wrapper",
        url: 'http://localhost:3000/slidersrc'
    });
    createSlider({
        parent: ".slider2__wrapper",
        url: 'http://localhost:3000/slidersrc',
        autoplay: true,
        delay: 2000
    });
});