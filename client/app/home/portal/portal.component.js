'use strict';
const angular = require('angular');

export class PortalComponent {

  /*@ngInject*/
  constructor() {

  }

}

export default angular.module('odonataApp.portal', [])
  .component('portal', {
    template: require('./portal.pug'),
    controller: PortalComponent,
    controllerAs: 'vm',
    authenticate: 'user'
  })
  .name;
