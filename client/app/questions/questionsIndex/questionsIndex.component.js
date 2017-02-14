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
  allTags = [];
  myQuestions = [];
  favQuestions = [];
  // busy = true;
  // noMoreData = false;

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
    this.loadAllTags();
    // this.loadMyQuestions();
    // this.loadFavoritesQuestions();
  }

  loadQuestions() {
    this.$http.get('/api/questions/')
      .then(response => {
        this.questions = response.data;
        // if(this.questions.length < 5) {
        //   this.noMoreData = true;
        // }
        // this.busy = false;
      });
  }

  loadAllTags() {
    this.$http.get('/api/questions/tags/all')
      .then(response => {
        this.allTags = response.data;
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
    if(keyword) {
      this.$http.get('/api/questions/search/' + keyword)
      .then(response => {
        this.questions = response.data;
      });
    }
  }

  // scrollPage() {
  //   if(this.busy) { 
  //     return;
  //   }
  //   this.busy = true;
  //   var lastId = this.questions[this.questions.length-1]._id;
  //   this.$http.get('/api/questions/scroll/' + lastId)
  //   .then(response => {
  //     this.questions = this.questions.concat(response.data);
  //     this.busy = false;
  //     if(this.questions.length === 0) {
  //       this.noMoreData = true;
  //     }
  //   });
  // };

  nextPage() {
    var lastId = this.questions[this.questions.length-1]._id;
    this.$http.get('/api/questions/next/' + lastId)
    .then(response => {
      this.questions = response.data;
    });
  };
  prevPage() {
    var firstId = this.questions[0]._id;
    this.$http.get('/api/questions/prev/' + firstId)
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