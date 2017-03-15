'use strict';
const angular = require('angular');

export class PortalComponent {
  $http;
  getCurrentUser: Function;
  userScore = [];

  /*@ngInject*/
  constructor($scope, $http, Auth) {
    this.$scope = $scope;
    this.$http = $http;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

  $onInit() {
    this.getUserScore();
  }

  getUserScore() {
    this.$http.get('/api/scores/' + this.getCurrentUser()._id)
    .then(response => {
      this.userScore = response.data;
    })
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
