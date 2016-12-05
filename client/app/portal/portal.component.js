'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './portal.routes';

export class PortalComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('odonataApp.portal', [ngRoute])
  .config(routes)
  .component('portal', {
    template: require('./portal.pug'),
    controller: PortalComponent,
    controllerAs: 'portalCtrl'
  })
  .name;
