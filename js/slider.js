export function createSlider({
    parent,
    url,
    autoplay = false,
    delay = 15000
}) {
    console.log(delay);
    class Slider {
        constructor(parent, url) {
            this.parent = document.querySelector(parent);
            this.url = url;
            this.imgArr = [];
            this.pushImg();
        }
        static async getData(url) {
            const imgData = await fetch(url).then((res) => {
                if (res.ok) {
                    return res;
                } else {
                    throw new Error(`Can not get data from${this.url}, message status ${imgData.status}`);
                }
            });
            return await imgData.json();
        }
        static stringToNumber(str) {
            let num = +str.replace(/\D/g, '');
            return num;
        }
        pushImg() {
            Slider.getData(this.url).
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
                    if (this.imgArr.length == 0) {
                        throw new Error(`Can not get data from${this.url}. It is empty`);
                    }
                    this.parent.innerHTML = `<div class="${this.parent.classList}-slide-next">&#8658;</div> \n
                    <div class="${this.parent.classList}-slide-prev">&#8656;</div>\n
                    <div class="${this.parent.classList}-slider_inner"></div>
                    <div class= "${this.parent.classList}-slider_counter"><span id='cur'></span><span id='tot'></span></div>`;
                    this.imgArr.forEach(elem => {
                        this.parent.querySelector(`.${this.parent.classList}-slider_inner`).append(elem);
                    });
                })
                .then(() => {
                    let offset = 0,
                        slideIndex = 1;
                    const inner = this.parent.querySelector(`.${this.parent.classList}-slider_inner`),
                        nextBtn = this.parent.querySelector(`.${this.parent.classList}-slide-next`),
                        prevBtn = this.parent.querySelector(`.${this.parent.classList}-slide-prev`),
                        counter = this.parent.querySelector(`.${this.parent.classList}-slider_counter`),
                        currentInd = counter.querySelector('#cur'),
                        totalInd = counter.querySelector('#tot'),
                        totalSlides = this.imgArr.length;
                    inner.style.cssText = `height: 100%;background-color: blue;\n
                    display: flex;transition: 0.5s all;`;
                    inner.style.width =
                        `${Slider.stringToNumber(window.getComputedStyle(this.parent).width) * totalSlides}px`;
                    nextBtn.style.cssText = 'position: absolute;color: white;font-size: 25px; top: 50%; transform: translate(-100%, -50%);left: 100%; cursor: pointer; z-index: 10;';
                    prevBtn.style.cssText = 'position: absolute; color: white;font-size: 25px;top: 50%; transform: translateY(-50%);left: 0; cursor: pointer; z-index: 10;';
                    counter.style.cssText = 'position: absolute; color: white;font-size: 25px;top: 0; transform: translateX(-100%);left: 100%; z-index: 10;';
                    totalInd.innerText = `/${totalSlides}`;
                    currentInd.innerText = `${slideIndex}`;
                    nextBtn.addEventListener('click', () => {
                        if (offset == Slider.stringToNumber(window.getComputedStyle(this.parent).width) * (totalSlides - 1)) {
                            offset = 0;
                            slideIndex = 1;
                        } else {
                            offset += Slider.stringToNumber(window.getComputedStyle(this.parent).width);
                            slideIndex += 1;
                        }
                        inner.style.transform = `translateX(-${offset}px)`;
                        currentInd.innerText = `${slideIndex}`;
                    });
                    prevBtn.addEventListener('click', () => {
                        if (offset == 0) {
                            offset = Slider.stringToNumber(window.getComputedStyle(this.parent).width) * (totalSlides - 1);
                            slideIndex = totalSlides;
                        } else {
                            offset -= Slider.stringToNumber(window.getComputedStyle(this.parent).width);
                            slideIndex -= 1;
                        }
                        inner.style.transform = `translateX(-${offset}px)`;
                        currentInd.innerText = `${slideIndex}`;
                    });
                })
                .catch((e) => {
                    console.log(`error ${e}`);
                    let errSlide = document.createElement('div');
                    errSlide.style.cssText = `height: 100%; width: 100%; background-color:red; display:flex;align-items: center;justify-content: center`;
                    errSlide.innerHTML = `<h2>Error ${e} <h2>`;
                    this.parent.append(errSlide);
                });
        }
    }

    class AutoSlider extends Slider {
        constructor(parent, url, delay) {
            super(parent, url);
            this.delay = delay;
            this.checkDelay();
            this.autoplay();
        }
        checkDelay() {
            if (Number.isInteger(this.delay)) {
                this.delay = this.delay;
            } else {
                this.delay = 3000;
                console.log('У нас сработка');
            }
        }
        autoplay() {
            setTimeout(() => {
                console.log(`I am autoSlider${this.imgArr}`);
                const inner = this.parent.querySelector(`.${this.parent.classList}-slider_inner`),
                    counter = this.parent.querySelector(`.${this.parent.classList}-slider_counter`),
                    currentInd = counter.querySelector('#cur'),
                    totalSlides = this.imgArr.length;
                let offset = 0,
                    slideIndex = 1;
                setInterval(() => {
                    if (offset == Slider.stringToNumber(window.getComputedStyle(this.parent).width) * (totalSlides - 1)) {
                        offset = 0;
                        slideIndex = 1;
                    } else {
                        offset += Slider.stringToNumber(window.getComputedStyle(this.parent).width);
                        slideIndex += 1;
                    }
                    inner.style.transform = `translateX(-${offset}px)`;
                    currentInd.innerText = `${slideIndex}`;
                }, this.delay);
            }, 1000);
        }
    }

    if (!autoplay) {
        new Slider(parent, url);
    } else {
        new AutoSlider(parent, url, delay);
    }
}