'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './dashboard.routes';

export class DashboardComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('odonataApp.dashboard', [ngRoute])
  .config(routes)
  .component('dashboard', {
    template: require('./dashboard.pug'),
    controller: DashboardComponent,
    controllerAs: 'dashboardCtrl'
  })
  .name;
