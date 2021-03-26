export function createSlider({
    parent,
    url
}) {
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
                    <div class="${this.parent.classList}-slider_inner"></div>`;
                    this.imgArr.forEach(elem => {
                        this.parent.querySelector(`.${this.parent.classList}-slider_inner`).append(elem);
                    });
                })
                .then(() => {
                    let offset = 0;
                    const inner = this.parent.querySelector(`.${this.parent.classList}-slider_inner`),
                        nextBtn = this.parent.querySelector(`.${this.parent.classList}-slide-next`),
                        prevBtn = this.parent.querySelector(`.${this.parent.classList}-slide-prev`);
                    inner.style.cssText = `height: 100%;background-color: blue;\n
                    display: flex;transition: 0.5s all;`;
                    inner.style.width =
                        `${Slider.stringToNumber(window.getComputedStyle(this.parent).width) * this.imgArr.length}px`;
                    nextBtn.style.cssText = 'position: absolute;color: white;font-size: 25px; top: 50%; transform: translate(-100%, -50%);left: 100%; cursor: pointer; z-index: 10;';
                    prevBtn.style.cssText = 'position: absolute; color: white;font-size: 25px;top: 50%; transform: translateY(-50%);left: 0; cursor: pointer; z-index: 10;';
                    nextBtn.addEventListener('click', () => {
                        if (offset == Slider.stringToNumber(window.getComputedStyle(this.parent).width) * (this.imgArr.length - 1)) {
                            offset = 0;
                        } else {
                            offset += Slider.stringToNumber(window.getComputedStyle(this.parent).width);
                        }
                        inner.style.transform = `translateX(-${offset}px)`;
                    });
                    prevBtn.addEventListener('click', () => {
                        if (offset == 0) {
                            offset = Slider.stringToNumber(window.getComputedStyle(this.parent).width) * (this.imgArr.length - 1);
                        } else {
                            offset -= Slider.stringToNumber(window.getComputedStyle(this.parent).width);
                        }
                        inner.style.transform = `translateX(-${offset}px)`;
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

    new Slider(parent, url);
}