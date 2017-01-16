'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './quizIndex.routes';

export class QuizIndexComponent {
  $http;
  $routeParams;
  isLoggedIn: Function;
  getCurrentUser: Function;
  quizzes = [];

  /*@ngInject*/
  constructor($scope, $http, $routeParams, Auth) {
    this.$scope = $scope;
    this.$http = $http;
    this.$routeParams = $routeParams;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

  $onInit() {
    this.loadQuizzes();
  }

  loadQuizzes() {
    this.$http.get('/api/quiz/')
      .then(response => {
        this.quizzes = response.data;
        console.log(this.quizzes);
      });
  }
}

export default angular.module('odonataApp.quizIndex', [ngRoute])
  .config(routes)
  .component('quizIndex', {
    template: require('./quizIndex.pug'),
    controller: QuizIndexComponent,
    controllerAs: 'vm'
  })
  .name;
