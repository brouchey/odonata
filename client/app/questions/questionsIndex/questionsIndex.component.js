'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './questionsIndex.routes';

export class QuestionsIndexComponent {
  $http;
  $routeParams;
  isLoggedIn: Function;
  getCurrentUser: Function;
  questions = [];

  /*@ngInject*/
  constructor($scope, $http, $routeParams, Auth) {
    this.$scope = $scope;
    this.$http = $http;
    this.$routeParams = $routeParams;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

  $onInit() {
    this.loadQuestions();
  }

  isStar(obj) {
    return this.isLoggedIn() && obj && obj.stars && obj.stars.indexOf(this.getCurrentUser()._id)!==-1;
  }

  loadQuestions() {
    this.$http.get('/api/questions/')
      .then(response => {
        this.questions = response.data;
      });
  }

  loadMyQuestions() {
    this.$http.get('/api/questions/users/' + this.getCurrentUser()._id)
      .then(response => {
        this.questions = response.data;
      });
  }

  loadFavoritesQuestions() {
    this.$http.get('/api/questions/users/' + this.getCurrentUser()._id + '/favorites')
      .then(response => {
        this.questions = response.data;
      });
  }

  search(keyword) {
    this.$http.get('/api/questions/search/' + keyword)
      .then(response => {
        this.questions = response.data;
      });
    };

}

export default angular.module('odonataApp.questionsIndex', [ngRoute])
  .config(routes)
  .component('questionsIndex', {
    template: require('./questionsIndex.pug'),
    controller: QuestionsIndexComponent,
    controllerAs: 'vm'
  })
  .name;