'use strict';
const angular = require('angular');

export class adminSidebarComponent {

  /*@ngInject*/
  constructor($location, Auth) {
    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

  hasAvatar() {
    if (this.getCurrentUser().avatar != null) {
      return true;
    } else {
      return false;
    }
  }

  isActive(route) {
    return route === this.$location.path();
  }

}

export default angular.module('odonataApp.admin-sidebar', [])
  .component('adminSidebar', {
    template: require('./admin-sidebar.pug'),
    controller: adminSidebarComponent,
    controllerAs: 'vm',
    authenticate: 'admin'
  })
  .name;
