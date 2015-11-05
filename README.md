# angular-toastino ![Build Status](https://travis-ci.org/Mexassi/angular-toastino.svg)
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

- toastinoService.makeInfoToast(message, delayLength);
- toastinoService.makeWarningToast(message, delayLength);
- toastinoService.makeDangerToast(message, delayLength);
- toastinoService.makeSuccessToast(message, delayLength);

## LICENSE
MIT
