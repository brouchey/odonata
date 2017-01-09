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
    this.loadQuestions();
  }

  loadQuestions() {
    this.$http.get('/api/questions/' + this.$routeParams.id)
      .then(response => {
        this.question = response.data;
      });
  }

  submitAnswer() {
    this.$http.post('/api/questions/' + this.$routeParams.id + '/answers', this.$scope.newAnswer)
    .then(response => {
      this.loadQuestions();
      this.$scope.newAnswer = {};
    });
  }

  submitComment() {
    this.$http.post('/api/questions/' + this.$routeParams.id + '/comments', this.$scope.newComment)
    .then(response => {
      this.loadQuestions();
      this.$scope.newComment = {};
      this.editNewComment = false;
    });
  }

  submitAnswerComment(answer) {
    this.$http.post('/api/questions/' + this.$routeParams.id + '/answers/' + answer._id + '/comments', answer.newAnswerComment)
    .then(response => {
      this.loadQuestions();
    });
  }

  deleteQuestion() {
    this.$http.delete('/api/questions/' + this.$routeParams.id)
    .then(response => {
      this.$location.path('/questions');
    });
  }

  deleteAnswer(answer) {
    this.$http.delete('/api/questions/' + this.$routeParams.id + '/answers/' + answer._id)
    .then(response => {
      this.loadQuestions();
    });
  }

  updateQuestion() {
    this.$http.put('/api/questions/' + this.$routeParams.id, this.question)
    .then(response => {
      this.loadQuestions();
    });
  }

  updateAnswer(answer) {
    this.$http.put('/api/questions/' + this.$routeParams.id + '/answers/' + answer._id, answer)
    .then(response => {
      this.loadQuestions();
    });
  }

  deleteComment(comment) {
    this.$http.delete('/api/questions/' + this.$routeParams.id + '/comments/' + comment._id)
    .then(response => {
      this.loadQuestions();
    });
  }

  deleteAnswerComment(answer, answerComment) {
    this.$http.delete('/api/questions/' + this.$routeParams.id + '/answers/' + answer._id + '/comments/' + answerComment._id)
    .then(response => {
      this.loadQuestions();
    });
  }

  updateComment(comment) {
    this.$http.put('/api/questions/' + this.$routeParams.id + '/comments/' + comment._id, comment)
    .then(response => {
      this.loadQuestions();
    });
  }

  updateAnswerComment(answer, answerComment) {
    this.$http.put('/api/questions/' + this.$routeParams.id + '/answers/' + answer._id + '/comments/' + answerComment._id, answerComment)
    .then(response => {
      this.loadQuestions();
    });
  }

  isOwner(obj) {
    return this.isLoggedIn() && obj && obj.user && obj.user._id === this.getCurrentUser()._id;
  }

  isStar(obj) {
    return this.isLoggedIn() && obj && obj.stars && obj.stars.indexOf(this.getCurrentUser()._id)!==-1;
  }

  star(subpath) {
    this.$http.put('/api/questions/' + this.question._id + subpath + '/star')
    .then(response => {
      this.loadQuestions();
    });
  };

  unstar(subpath) {
    this.$http.delete('/api/questions/' + this.question._id + subpath + '/star')
    .then(response => {
      this.loadQuestions();
    });
  };
}

export default angular.module('odonataApp.questionsShow', [ngRoute])
  .config(routes)
  .component('questionsShow', {
    template: require('./questionsShow.pug'),
    controller: QuestionsShowComponent,
    controllerAs: 'vm'
  })
  .name;
