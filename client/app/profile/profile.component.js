'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './profile.routes';

export class ProfileComponent {
  
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

export default angular.module('odonataApp.profile', [ngRoute])
  .config(routes)
  .component('profile', {
    template: require('./profile.pug'),
    controller: ProfileComponent,
    controllerAs: 'profileCtrl'
  })
  .name;
