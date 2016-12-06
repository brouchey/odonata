'use strict';
const angular = require('angular');

export class sidebarComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Sidebar';
  }
}

export default angular.module('odonataApp.sidebar', [])
  .component('sidebar', {
    template: require('./sidebar.pug'),
    controller: sidebarComponent
  })
  .name;
