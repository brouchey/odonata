'use strict';
const angular = require('angular');

export class portalSidebarComponent {
  /*@ngInject*/
  constructor($location) {
    this.$location = $location;
  }

  isActive(route) {
    return route === this.$location.path();
  }
  
}

export default angular.module('odonataApp.portal-sidebar', [])
  .component('portalSidebar', {
    template: require('./portal-sidebar.pug'),
    controller: portalSidebarComponent,
    controllerAs: 'vm',
    authenticate: true
  })
  .name;
