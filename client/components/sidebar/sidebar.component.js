'use strict';
const angular = require('angular');

export class sidebarComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello Dashboard Constructor';
  }
  // isCollapsedHorizontal = false;
}

export default angular.module('odonataApp.sidebar', [])
  .component('sidebar', {
    template: require('./sidebar.pug'),
    controller: sidebarComponent,
    controllerAs: 'sidebarCtrl',
  })
  .name;
