# angular-toastino ![Build Status](https://travis-ci.org/Mexassi/angular-toastino.svg)
Create custom toast messages for your angular app
## Install
```sh
$ bower install angular-toastino --save
```
## How to use it
Pass the parameters into the directive as in the example:

```html
<toastino toastino="ts-default"
          dismiss="false"
          position="ts-top-right"
          message="toastinoMessage"></toastino>
```
- toastino: is the default class type for the toast message.
- dismiss: pass false to manual dismiss the toast message or leave it empty.
- position: class name for the position.
- message: the variable that holds the message.

The message is bind to the directive so you just need to change it when you want to create .

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
