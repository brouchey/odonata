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
  myQuestions = [];
  favQuestions = [];
  busy = true;
  noMoreData = false;

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
    this.loadMyQuestions();
    this.loadFavoritesQuestions();
  }

  loadQuestions() {
    this.$http.get('/api/questions/')
      .then(response => {
        this.questions = response.data;
        if(this.questions.length < 5) {
          this.noMoreData = true;
        }
        this.busy = false;
      });
  }

  loadMyQuestions() {
    this.$http.get('/api/questions/users/' + this.getCurrentUser()._id)
      .then(response => {
        this.myQuestions = response.data;
      });
  }

  loadFavoritesQuestions() {
    this.$http.get('/api/questions/users/' + this.getCurrentUser()._id + '/favorites')
      .then(response => {
        this.favQuestions = response.data;
      });
  }

  isStar(obj) {
    return this.isLoggedIn() && obj && obj.stars && obj.stars.indexOf(this.getCurrentUser()._id)!==-1;
  }

  search(keyword) {
    if (keyword.length === 0) {
      this.loadQuestions();
    } else {
      this.$http.get('/api/questions/search/' + keyword)
      .then(response => {
        this.questions = response.data;
      });
    };
  };

  nextPage() {
    if(this.busy) { 
      return;
    }
    this.busy = true;
    var lastId = this.questions[this.questions.length-1]._id;
    this.$http.get('/api/questions/next/' + lastId)
    .then(response => {
      this.questions = this.questions.concat(response.data);
      this.busy = false;
      if(this.questions.length === 0) {
        this.noMoreData = true;
      }
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