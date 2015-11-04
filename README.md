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
myApp.controller('myController', function($scope, toastinoService) {
  $scope.toastinoMessages = toastinoService.toastinoMessages;
});
```
Create a toastino message by calling the set method passing an anonymous object:
```js
var object = {
  classValue: 'ts-default',
  message: 'New notification',
  autoDismiss: true
};

toastinoService.setToastino(object);
```
The classValue and message properties are required; the autoDismiss property is optional, it is set to false by default.

Pass the parameters into the directive as in the example:

```html
<div ng-app="myApp" ng-controller="myController">
  <toastino toastinos="toastinoMessages"></toastino>
</div>
```
## Available css classes

- ts-success
- ts-warning
- ts-danger
- ts-default

**LICENSE**
MIT
