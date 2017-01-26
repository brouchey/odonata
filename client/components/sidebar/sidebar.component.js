'use strict';

import angular from 'angular';

export class sidebarComponent {
  $location;
  isLoggedIn: Function;
  isAdmin: Function;
  getCurrentUser: Function;

  constructor($location, Auth) {
    'ngInject';

    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

}

export default angular.module('odonataApp.sidebar', [])
  .component('sidebar', {
    template: require('./sidebar.pug'),
    controller: sidebarComponent
  })
  .name;
