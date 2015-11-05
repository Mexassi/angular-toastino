/*!
* angular-toastino v0.0.8
* https://github.com/Mexassi/angular-toastino
* Copyright (c) 2015 Massimo Presta
* License: MIT
*/

'use strict';

var toastino = angular.module('mexassi.toastino',[]);

toastino.factory('Toastino', function ($timeout) {
  var Toastino = function (classValue) {
    this.message = '';
    this.classValue = classValue;
    this.position = 'ts-top-right';
    this.className = 'ts-toastino';
    this.autoDismiss = false;
    this.delay = 3700;
    this.observer = null;
  };

  Toastino.prototype.registerListener = function (listener) {
    this.observer = listener;
  };

  Toastino.prototype.broadcastChanges = function () {
    if (this.observer.update instanceof Function) {
      this.observer.update(this);
    }
  };

  Toastino.prototype.manualDismiss = function () {
    this.autoDismiss = false;
  };

  Toastino.prototype.setClass = function () {
    this.className += (this.position !== undefined && this.position !== null) ? ' ' + this.classValue + ' ' + this.position : this.classValue;
  };

  Toastino.prototype.setMessage = function (message) {
    this.setClass();
    this.message = message;
    this.close();
  };

  Toastino.prototype.close = function () {
    if (this.autoDismiss) {
      var self = this;
      $timeout(function () {
        self.dismiss();
      }, this.delay);
    }
  };

  Toastino.prototype.clearMessage = function () {
    this.message = '';
  };

  Toastino.prototype.dismiss = function () {
    this.className += ' ' + Toastino.DISMISS;
    var self = this;
    //remove item from array after dismiss css animation ends -> 350ms
    $timeout(function () {
      self.broadcastChanges(this);
    }, 350);
  };

  Toastino.DISMISS = 'ts-dismiss';

  return Toastino;
});

toastino.factory('toastinoService', function(Toastino) {

  var ToastinoService = function () {
    this.toastinoMessages = [];
    this.observer = undefined;
  };

  ToastinoService.prototype.registerListener = function(observer){
    this.observer = observer;
  };

  ToastinoService.prototype.broadcastChanges = function(){
    if(this.observer !== undefined && this.observer.toastChanged instanceof Function){
      //this.observer.toastChanged();
    } else {
      console.error('Cannot toast.');
    }
  };

  ToastinoService.prototype.update = function (toastino) {
    if (toastino instanceof Toastino) {
      this.remove(toastino);
    }
  };

  ToastinoService.prototype.remove = function(toastino) {
    for (var i = 0; i < this.toastinoMessages.length; i++) {
      if (toastino === this.toastinoMessages[i]) {
        this.toastinoMessages.splice(i, 1);
        break;
      }
    }
  };

  ToastinoService.prototype.playAlert = function () {
    var element = document.getElementById('xyz');
    if (element !== undefined) {
      element.play();
    }
  };

  ToastinoService.prototype.buildToastino = function (object) {
    var toastino = new Toastino(object.classValue);

    if (object.autoDismiss !== undefined) {
      toastino.autoDismiss = object.autoDismiss;
    }

    if (object.delay !== undefined) {
      toastino.delay = object.delay;
    }

    toastino.registerListener(this);
    toastino.setMessage(object.message);
    return toastino;
  };

  ToastinoService.prototype.popToast = function(toastino){
    this.toastinoMessages.unshift(toastino);
  };

  ToastinoService.prototype.makeDangerToast = function (message, length) {
    this.makeToast({
      classValue: 'alert alert-danger',
      message: message,
      autoDismiss: true
    }, length);
  };

  ToastinoService.prototype.makeWarningToast = function (message, length) {
    this.makeToast({
      classValue: 'alert alert-warning',
      message: message,
      autoDismiss: true
    }, length);
  };

  ToastinoService.prototype.makeSuccessToast = function (message, length) {
    this.makeToast({
      classValue: 'alert alert-success',
      message: message,
      autoDismiss: true
    }, length);
  };

  ToastinoService.prototype.makeInfoToast = function (message, length) {
    this.makeToast({
      classValue: 'alert alert-info',
      message: message,
      autoDismiss: true
    }, length);
  };

  ToastinoService.prototype.makeToast = function (object, length) {
    if (object.classValue !== undefined && object.message !== undefined) {

      object.delay = length ? (length === 'long' ? 7400 : 3700) : 3700;

      var toastino = this.buildToastino(object);
      this.popToast(toastino);
      this.broadcastChanges();
    } else {
      throw new TypeError('The object must have properties: classValue, message');
    }
  };

  return new ToastinoService();
});

toastino.directive('toastino', function () {
  return {
    restrict: 'E',
    template:
    '<div class="ts-container">' +
      '<div ng-repeat="toast in toastinoController.toastinos" class="alert-dismissible {{toast.className}}">' +
        '<button type="button" class="close" aria-label="Close" ng-click="toast.dismiss()"><span aria-hidden="true">&times;</span></button>' +
        '{{toast.message}}' +
      '</div>' +
    '</div>',
    controller: function toastinoController(toastinoService) {
      var vm = this;
      vm.init = function(){
        vm.toastinos = [];
        toastinoService.registerListener(vm);
        vm.toastChanged();
      };

      vm.toastChanged = function(){
        vm.toastinos = toastinoService.toastinoMessages;
      };

      vm.init();
    },
    controllerAs:  'toastinoController'
  };
});

toastino.controller('toastinoCtrl', function (toastinoService) {
  var callbacks = ['makeInfoToast',
                   'makeSuccessToast',
                   'makeWarningToast',
                   'makeDangerToast'];
  var messages = [
    'Hello I am Angular-toastino',
    'You can use me to display toast messages',
    'Just inject toastinoService in your controller',
    'You can install me via bower install angular-toastino',
  ];

  this.randomNumber = function () {
    var number = Math.floor(Math.random() * 4) + 1;
    return number;
  };

  this.createToastino = function () {
    var callbackNumber = this.randomNumber() - 1;
    var that = this;
    if (callbacks[callbackNumber] === 'makeInfoToast') {
      toastinoService.makeInfoToast(messages[that.randomNumber() - 1]);
    } else if (callbacks[callbackNumber] === 'makeSuccessToast') {
      toastinoService.makeSuccessToast(messages[that.randomNumber() - 1], 'long');
    } else if (callbacks[callbackNumber] === 'makeWarningToast') {
      toastinoService.makeWarningToast(messages[that.randomNumber() - 1]);
    } else if (callbacks[callbackNumber] === 'makeDangerToast') {
      toastinoService.makeDangerToast(messages[that.randomNumber() - 1], 'long');
    }
  };
});
