'use strict';
const angular = require('angular');

export class sidebarComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello Sidebar Constructor';
  }

}

export default angular.module('odonataApp.sidebar', [])
  .component('sidebar', {
    template: require('./sidebar.pug'),
    controller: sidebarComponent,
    controllerAs: 'vm',
  })
  .name;
