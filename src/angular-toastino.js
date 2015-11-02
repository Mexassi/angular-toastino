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
      console.log(this.autoDismiss);
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
  };

  Toastino.DISMISS = 'ts-dismiss';

  return Toastino;
});

toastino.directive('toastino', function (Toastino) {
  return {
    restrict: 'EA',
    compile: function (tElement, tAttrs, transclude) {
        var attributes = ['toastino', 'position', 'message', 'dismiss'];
        function _validateAttributes() {
            for (var i = 0; i < attributes.length; i++) {
                if (tAttrs[attributes[i]] === undefined) {
                    throw new TypeError('Missing required attribute: ' + attributes[i]);
                }
            }
        }
        _validateAttributes();
        var className = tAttrs.toastino;
        var position = tAttrs.position;
        var message = tAttrs.message;
        var autoDismiss = tAttrs.dismiss;
        var toast = new Toastino(className, position);
        toast.autoDismiss = (autoDismiss === 'true');
        toast.setMessage(message);
      if (toast.message === '') {
        tElement.html('');
      } else {
        tElement.html('<div class="{{toast.className}}">' +
        '<span ng-bind="'+message+'"></span>' +
        '<button class="ts-button" ng-click="toast.dismiss()">x</button>' +
        '</div>');
      }
      return function (scope, element, attrs) {
        scope.setMessage = function () {
          scope.message = 'new notification at: ' + new Date();
        };
        scope.message = ' Hello I am Angular-toastino!';
          attrs.$observe('message', function (value) {
             message = value;
          });
             scope.$watch(message, function() {
                toast.setMessage(message);
            }, true);
        if (toast instanceof Toastino || toast === null) {
          scope.toast = toast;
        } else {
          throw new TypeError('invalid instance: the attribute must be a Toastino instance');
        }
      };
    }
  };
});
