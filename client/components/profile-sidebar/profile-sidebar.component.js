'use strict';
const angular = require('angular');

export class profileSidebarComponent {
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

export default angular.module('odonataApp.profile-sidebar', [])
  .component('profileSidebar', {
    template: require('./profile-sidebar.pug'),
    controller: profileSidebarComponent,
    controllerAs: 'vm',
    authenticate: true
  })
  .name;
