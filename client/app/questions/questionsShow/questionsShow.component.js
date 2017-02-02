'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './questionsShow.routes';

export class QuestionsShowComponent {
  $http;
  $routeParams;
  $location;
  isLoggedIn: Function;
  getCurrentUser: Function;
  question = {};
  answer = {};
  newAnswer = {};
  comment = {};
  newComment = {};

  /*@ngInject*/
  constructor($scope, $http, $routeParams, Auth, $location) {
    this.$scope = $scope;
    this.$http = $http;
    this.$routeParams = $routeParams;
    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

  $onInit() {
    this.loadQuestion();
  }

  loadQuestion() {
    this.$http.get('/api/questions/' + this.$routeParams.id)
      .then(response => {
        this.question = response.data;
      });
  }

  submitAnswer() {
    this.$http.post('/api/questions/' + this.question._id + '/answers', this.$scope.newAnswer)
    .then(response => {
      this.question = response.data;
      this.$scope.newAnswer = {};
    });
  }

  submitComment() {
    this.$http.post('/api/questions/' + this.question._id + '/comments', this.newComment)
    .then(response => {
      this.question = response.data;
      this.newComment = {};
    });
  }

  submitAnswerComment(answer) {
    this.$http.post('/api/questions/' + this.question._id + '/answers/' + answer._id + '/comments', answer.newAnswerComment)
    .then(response => {
      this.question = response.data;
    });
  }

  deleteQuestion() {
    this.$http.delete('/api/questions/' + this.question._id)
    .then(response => {
      this.$location.path('/questions');
    });
  }

  deleteAnswer(answer) {
    this.$http.delete('/api/questions/' + this.question._id + '/answers/' + answer._id)
    .then(response => {
      this.question = response.data;
    });
  }

  updateQuestion() {
    this.$http.put('/api/questions/' + this.question._id, this.question)
    .then(response => {
      this.question = response.data;
    });
  }

  updateAnswer(answer) {
    this.$http.put('/api/questions/' + this.question._id + '/answers/' + answer._id, answer)
    .then(response => {
      this.question = response.data;
    });
  }

  deleteComment(comment) {
    this.$http.delete('/api/questions/' + this.question._id + '/comments/' + comment._id)
    .then(response => {
      this.question = response.data;
    });
  }

  deleteAnswerComment(answer, answerComment) {
    this.$http.delete('/api/questions/' + this.question._id + '/answers/' + answer._id + '/comments/' + answerComment._id)
    .then(response => {
      this.question = response.data;
    });
  }

  updateComment(comment) {
    this.$http.put('/api/questions/' + this.question._id + '/comments/' + comment._id, comment)
    .then(response => {
      this.question = response.data;
    });
  }

  updateAnswerComment(answer, answerComment) {
    this.$http.put('/api/questions/' + this.question._id + '/answers/' + answer._id + '/comments/' + answerComment._id, answerComment)
    .then(response => {
      this.question = response.data;
    });
  }

  isOwner(obj) {
    return this.isLoggedIn() && obj && obj.user && obj.user._id === this.getCurrentUser()._id;
  }

  isStar(obj) {
    return this.isLoggedIn() && obj && obj.stars && obj.stars.indexOf(this.getCurrentUser()._id)!==-1;
  }

  star() {
    this.$http.put('/api/questions/' + this.question._id + '/star')
    .then(response => {
      this.question = response.data;
    });
  }

  unstar() {
    this.$http.delete('/api/questions/' + this.question._id + '/star')
    .then(response => {
      this.question = response.data;
    });
  }

  voteUp(subpath) {
    this.$http.put('/api/questions/' + this.question._id + subpath + '/voteUp')
    .then(response => {
      this.question = response.data;
    });
  }

  voteDown(subpath) {
    this.$http.put('/api/questions/' + this.question._id + subpath + '/voteDown')
    .then(response => {
      this.question = response.data;
    });
  }

  bestAnswer(answer) {
    this.$http.put('/api/questions/' + this.question._id + '/answers/' + answer._id + '/bestAnswer')
    .then(response => {
      this.question = response.data;
    });
  }

}

export default angular.module('odonataApp.questionsShow', [ngRoute])
  .config(routes)
  .component('questionsShow', {
    template: require('./questionsShow.pug'),
    controller: QuestionsShowComponent,
    controllerAs: 'vm'
  })
  .name;
