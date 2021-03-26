/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/slider.js":
/*!**********************!*\
  !*** ./js/slider.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createSlider": () => (/* binding */ createSlider)
/* harmony export */ });
function createSlider({
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./js/slider.js");

window.addEventListener('DOMContentLoaded', function () {
    (0,_slider__WEBPACK_IMPORTED_MODULE_0__.createSlider)({
        parent: ".slider__wrapper",
        url: 'http://localhost:3000/slidersrc'
    });
    (0,_slider__WEBPACK_IMPORTED_MODULE_0__.createSlider)({
        parent: ".slider2__wrapper",
        url: 'http://localhost:3000/slidersrc'
    });
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map