/*!
 * angular-toastino v0.0.1
 * https://github.com/Mexassi/angular-toastino
 * Copyright (c) 2015 Massimo Presta
 * License: MIT
 */

   'use strict';
  //  var angular = '/bower_components/angular/angular.min.js';
   var toastino = angular.module('mexassi.toastino',[]);

   toastino.factory('Toastino', function ($timeout) {
     var Toastino = function (classValue, position) {
       this.message = '';
       this.classValue = classValue;
       this.position = position;
       this.autoDismiss = true;
       this.delay = 2700;
       this.setClass();
     };

     Toastino.prototype.manualDismiss = function () {
       this.autoDismiss = false;
     };

     Toastino.prototype.setClass = function () {
       this.classValue = (this.position !== undefined && this.position !== null) ? this.classValue + ' ' + this.position : this.classValue;
     };

     Toastino.prototype.setMessage = function (message) {
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
       this.classValue += ' ' + Toastino.DISMISS;
     };

     Toastino.DISMISS = 'ts-dismiss';

     return Toastino;
   });

   toastino.directive('toastino', function (Toastino) {
     var template = '<div class="{{toast.classValue}}">' +
                    '<span>{{toast.message}}' +
                    '<button class="ts-button" ng-click="toast.dismiss()">x</button>' +
                    '</span>' +
                    '</div>';
     return {
       restrict: 'EA',
       compile: function (tElement, tAttrs, transclude) {
        //  var toast = tAttrs.toast;
        var toast = new Toastino('ts-default', 'ts-top-right');
        toast.autoDismiss = false;
        toast.setMessage('This code has been already selected');
         console.log(toast instanceof Toastino);
         tElement.html(template);
         return function (scope, element, attrs) {
           if (toast instanceof Toastino) {
             scope.toast = toast;
           } else {
             throw new TypeError('invalid instance: the attribute must be a Toastino instance');
           }
         };
       }
     };
   });
