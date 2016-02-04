Create custom toast messages for your angular app
## Install
```sh
$ bower install angular-toastino --save
```
Include the css file and the module in your app:
```js
var myApp = angular.module('myApp', ['mexassi.toastino']);
```
## How to use it
Inject toastino service into your controller and set the array of toast messages:
```js
myApp.controller('myController', function(toastinoService) {

});
```
Create a toastino message passing the message value and a string value for the delay length:
```js
myApp.controller('myController', function(toastinoService) {
  // this will create a toast message with a long delay.
  toastinoService.makeInfoToast('your custom message', 'long');

  // this will create a toast message with a short delay.
  toastinoService.makeWarningToast('your custom alert');
});
```
The classValue and message properties are required; the autoDismiss property is optional, it is set to false by default.

Pass the parameters into the directive as in the example:

```html
<div ng-app="myApp" ng-controller="myController">
  <toastino></toastino>
</div>
```
## Available methods
The methods take only two parameters: the message string value and a delayLength.
The delayLength argument can be set to ```'long'``` for a longer delay, if not the delay is short.
```js
toastinoService.makeInfoToast('message', delayLength);
toastinoService.makeWarningToast('message', delayLength);
toastinoService.makeDangerToast('message', delayLength);
toastinoService.makeSuccessToast('message', delayLength);
```

## Customising your Toastino
You can now show your toast messages at the bottom of the screen by passing a containerclass property into the toastino directive. When the property is null or undefined the your toast messages will be displayed on the top right corner as per default settings.
```html
<div ng-app="myApp" ng-controller="myController">
  <toastino containerclass="myController.containerClass"></toastino>
</div>
```

You can also have multiple instances of the toastino directive so that one will display the messages on the top right corner and the other at the bottom of the screen. If you do so, to avoid duplicate messages you should declare the toastino properties into your second instance.
```html
<div ng-app="myApp" ng-controller="myController">
    <toastino></toastino>
    <toastino containerclass="myController.containerClass" toastinos="myController.toastinos"></toastino>
    <button class="btn btn-info" ng-click="myController.createCustomToastino()">Toast</button>
</div>
```

The first instance will display the messages in the top right corner of the screen that are generated using the [available methods](#methods). The second instance will need to use a customised building method.
```js
myApp.controller('myController', function(toastinoService) {
    var _this = this;
    _this.toastinos = [];
    var message = 'Hey! Thanks for using Toastino!';
    _this.createCustomToastino = function() {
        var toastino = toastinoService.buildToastino({
        classValue: toastinoService.TOAST_CLASS_DANGER,
        message: message,
        autoDismiss: false,
        array: _this.toastinos
        });
        _this.test.unshift(toastino);
    };
  });
```
The object passed as a parameter must have a message, a classValue and the array property. The array property is important so toastino knows that when dismissing a custom toast message this has to be removed from its array.

## Available css classes
```js
  toastinoService.TOAST_CLASS_DANGER;
  toastinoService.TOAST_CLASS_WARNING;
  toastinoService.TOAST_CLASS_SUCCESS;
  toastinoService.TOAST_CLASS_INFO;
```
## LICENSE
MIT
