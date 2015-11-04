/*!
* angular-toastino v1.0.1
* https://github.com/Mexassi/angular-toastino
* Copyright (c) 2015 Massimo Presta
* License: MIT
*/

'use strict';

var toastino = angular.module('mexassi.toastino',[]);

toastino.factory('Toastino', function ($timeout) {
  var Toastino = function (classValue, position) {
    this.message = '';
    this.classValue = classValue;
    this.position = position;
    this.className = null;
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
    this.className = (this.position !== undefined && this.position !== null) ? this.classValue + ' ' + this.position : this.classValue;
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

  ToastinoService.prototype.buildToastino = function (object) {
    var toastino = new Toastino(object.classValue, object.position);
    if (object.autoDismiss !== undefined) {
      toastino.autoDismiss = !toastino.autoDismiss;
    }
    toastino.registerListener(this);
    toastino.setMessage(object.message);
    this.toastinoMessages.unshift(toastino);
  };

  ToastinoService.prototype.setToastino = function (object) {
    if (object.classValue !== undefined && object.position !== undefined && object.message !== undefined) {
      this.buildToastino(object);
    } else {
      throw new TypeError('The object must have properties: classValue, position, message');
    }
  };

  return new ToastinoService();
});

toastino.directive('toastino', function () {
  return {
    restrict: 'E',
    scope: {
      toastinos: '='
    },
    template:
    '<div class="ts-container">' +
    '<div ng-repeat="toast in toastinos" class="{{toast.className}}">' +
    '<span>{{toast.message}}</span>' +
    '<button class="ts-button" ng-click="toast.dismiss()">x</button>' +
    '</div>' +
    '</div>',
  };
});

toastino.controller('toastinoCtrl', function (toastinoService, $scope) {
  $scope.toastMessages = toastinoService.toastinoMessages;
  var classValues = ['ts-default', 'ts-success', 'ts-danger', 'ts-warning'];
  var messages = [
    'Hello I am Angular-toastino',
    'You can use me to display toast messages',
    'Just inject toastinoService in your controller',
    'You can install me via bower install angular-toastino',
  ];

  $scope.randomNumber = function () {
    var number = Math.floor(Math.random() * 4) + 1;
    return number;
  };

  $scope.createToastino = function () {
    var object = {
      classValue: classValues[$scope.randomNumber() - 1],
      position: 'ts-top-right',
      message: messages[$scope.randomNumber() - 1],
      autoDismiss: true
    };
    toastinoService.setToastino(object);
  };
});
