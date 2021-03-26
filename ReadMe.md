# SimpiestSlider

This is Simpliest slider that requires only ParentNode selector and url to images source(now using only json-server).

## Installation

1. Download file slider.js from folder js.
2. Install json-server

```bash
npm i json-server --save-dev
```

3. Create json file with your images paths
   Example

```json
{
  "slidersrc": [
    {
      "src": "slider/paprika.jpg"
    },
    {
      "src": "slider/food-12.jpg"
    }
  ]
}
```

4. Import it to your main.js file.

```js
import { createSlider } from "Your path to file";
```

5. Call createSlider function in your code, with parent-selector and json-server url
   Example

```js
createSlider({
  parent: ".slider__wrapper",
  url: "http://localhost:3000/slidersrc",
});
```

6. Thats all, slider should be on a page in any kind of div, you choose.

## Error handling

If you use incorrect url or server respond with empty data instead of slider you will see error block

```js
.catch((e) => {
    console.log(`error ${e}`);
    let errSlide = document.createElement('div');
    errSlide.style.cssText = `height: 100%; width: 100%; background-color:red; display:flex;align-items: center;justify-content: center`;
    errSlide.innerHTML = `<h2>Error ${e} <h2>`;
    this.parent.append(errSlide);
})
```
