'use strict';
const angular = require('angular');

export class sidebarComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello Dashboard Constructor';
  }
}

export default angular.module('odonataApp.sidebar', [])
  .component('sidebar', {
    template: require('./sidebar.pug'),
    controller: sidebarComponent,
    controllerAs: 'sidebarCtrl',
  })
  .controller('sidebarCtrl', function ($scope) {
    $scope.isCollapsedHorizontal = false;
  })
  .name;
