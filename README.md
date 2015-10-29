# angular-toastino ![Build Status](https://travis-ci.org/Mexassi/angular-toastino.svg)
Create custom toast messages for your angular app
## Install
```sh
$ bower install angular-toastino --save
```
## How to use it
Create a new Toastino in your controller passing the css class name and the position you want it to appear as string value:

```js
var toast = new Toastino(className, position);
this.toast = toast;
```

Pass the created object as an attribute:

```html
<toastino toast="controller.toast"></toastino>
```
### Available css classes

- ts-success
- ts-warning
- ts-danger
- ts-default

### Available position values

- ts-top-left
- ts-top-middle
- ts-top-right
- ts-middle
- ts-bottom-left
- ts-bottom-middle
- ts-bottom-right
