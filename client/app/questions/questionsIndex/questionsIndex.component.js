'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './questionsIndex.routes';

export class QuestionsIndexComponent {
  $http;
  isLoggedIn: Function;
  getCurrentUser: Function;
  questions = [];

  /*@ngInject*/
  constructor($scope, $http, Auth) {
    this.$scope = $scope;
    this.$http = $http;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

  $onInit() {
    this.$http.get('/api/questions')
      .then(response => {
        this.questions = response.data;
      });
  }

  isStar(obj) {
    return this.isLoggedIn() && obj && obj.stars && obj.stars.indexOf(this.getCurrentUser()._id)!==-1;
  }

}

export default angular.module('odonataApp.questionsIndex', [ngRoute])
  .config(routes)
  .component('questionsIndex', {
    template: require('./questionsIndex.pug'),
    controller: QuestionsIndexComponent,
    controllerAs: 'vm'
  })
  .name;