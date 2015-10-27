/*!
 * angular-toastino v0.0.1
 * https://github.com/Mexassi/angular-toastino
 * Copyright (c) 2015 Massimo Presta
 * License: MIT
 */

 // (function(angular) {
   'use strict';
  //  var angular = '/bower_components/angular/angular.min.js';
   var toastino = angular.module('mexassi.toastino',[]);

   toastino.factory('Toastino', function () {
     var Toastino = function () {
       this.message = 'I am toastino!';
     };
     return Toastino;
   });


 // })();
