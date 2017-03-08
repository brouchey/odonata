'use strict';
import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './home.routes';

export class HomeController {
  isLoggedIn: Function;

  /*@ngInject*/
  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedInSync;
  }

  $onInit() {

  }

}

export default angular.module('odonataApp.home', [ngRoute])
  .config(routing)
	.controller('HomeController', HomeController)
  .name;

