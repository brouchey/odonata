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
  filteredQuestions = [];
  allTags = [];
  // busy = true;
  // noMoreData = false;
  currentPage = 1;
  itemsPerPage = 10;
  maxSize = 7;

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
  }

  loadQuestions() {
    this.$http.get('/api/questions/')
      .then(response => {
        this.questions = response.data;
        this.currentPage = 1;
        this.filteredQuestions = this.questions.slice((this.currentPage - 1), this.itemsPerPage);
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
    this.$http.get('/api/questions/user/' + this.getCurrentUser()._id)
      .then(response => {
        this.questions = response.data;
        this.filteredQuestions = response.data.slice((this.currentPage - 1), this.itemsPerPage);
      });
  }

  loadFavoritesQuestions() {
    this.$http.get('/api/questions/user/' + this.getCurrentUser()._id + '/favorites')
      .then(response => {
        this.questions = response.data;
        this.filteredQuestions = response.data.slice((this.currentPage - 1), this.itemsPerPage);
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
        this.filteredQuestions = response.data.slice((this.currentPage - 1), this.itemsPerPage);
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

  questionsToDisplay() {
    var begin = ((this.currentPage - 1) * this.itemsPerPage);
    var end = begin + this.itemsPerPage;
    this.filteredQuestions = this.questions.slice(begin, end);
  }

  pageChanged() {
    this.questionsToDisplay();
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