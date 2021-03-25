window.addEventListener('DOMContentLoaded', function () {
    async function getData(url) {
        const imgData = await fetch(url);
        if (!imgData.ok) {
            throw new Error(`Can not get data from${this.url}, message status ${imgData.status}`);
        }

        return await imgData.json();
    }

    function stringToNumber(str) {
        let num = +str.replace(/\D/g, '');
        return num;
    }

    class Slider {
        constructor(parent, url) {
            this.parent = document.querySelector(parent);
            this.url = url;
            this.imgArr = [];
            this.pushImg();
        }
        pushImg() {
            getData(this.url).
            then(data => {
                    data.forEach(({
                        src
                    }) => {
                        let slide = document.createElement('div');
                        slide.innerHTML = `<img src =${src} alt= "${src.match(/[^\/]+$/)[0]}">`;
                        slide.querySelector('img').style.cssText = `height:${window.getComputedStyle(this.parent).height};\n 
                        width: ${window.getComputedStyle(this.parent).width}`;
                        this.imgArr.push(slide);
                    });
                })
                .then(() => {
                    this.parent.innerHTML = `<div class="${this.parent.classList}-slide-next">&#8658;</div> \n
                    <div class="${this.parent.classList}-slide-prev">&#8656;</div>\n
                    <div class="${this.parent.classList}-slider_inner"></div>`;
                    this.imgArr.forEach(elem => {
                        this.parent.querySelector(`.${this.parent.classList}-slider_inner`).append(elem);
                    });
                })
                .then(() => {
                    let offset = 0;
                    this.parent.querySelector(`.${this.parent.classList}-slider_inner`).style.cssText = `height: 100%;background-color: blue;\n
                    display: flex;`;
                    this.parent.querySelector(`.${this.parent.classList}-slider_inner`).style.width =
                        `${stringToNumber(window.getComputedStyle(this.parent).width) * this.imgArr.length}px`;
                    this.parent.querySelector(`.${this.parent.classList}-slide-next`).style.cssText = 'position: absolute;color: white;font-size: 25px; top: 50%; transform: translate(-100%, -50%);left: 100%; cursor: pointer; z-index: 10;';
                    this.parent.querySelector(`.${this.parent.classList}-slide-prev`).style.cssText = 'position: absolute; color: white;font-size: 25px;top: 50%; transform: translateY(-50%);left: 0; cursor: pointer; z-index: 10;';
                    this.parent.querySelector(`.${this.parent.classList}-slide-next`).addEventListener('click', () => {
                        console.log('next');
                        if (offset == stringToNumber(window.getComputedStyle(this.parent).width) * (this.imgArr.length - 1)) {
                            offset = 0;
                        } else {
                            offset += stringToNumber(window.getComputedStyle(this.parent).width);
                        }
                        this.parent.querySelector(`.${this.parent.classList}-slider_inner`).style.transform = `translateX(-${offset}px)`;
                    });
                    document.querySelector(`.${this.parent.classList}-slide-prev`).addEventListener('click', () => {
                        if (offset == 0) {
                            offset = stringToNumber(window.getComputedStyle(this.parent).width) * (this.imgArr.length - 1);
                        } else {
                            offset -= stringToNumber(window.getComputedStyle(this.parent).width);
                        }
                        this.parent.querySelector(`.${this.parent.classList}-slider_inner`).style.transform = `translateX(-${offset}px)`;
                        console.log('prev');
                    });
                });
        }

    }

    const slider1 = new Slider(".slider__wrapper", 'http://localhost:3000/slidersrc');
    const slider2 = new Slider(".slider2__wrapper", 'http://localhost:3000/slidersrc');
});