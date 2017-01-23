'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './quizCreate.routes';

export class QuizCreateComponent {
  $http;
  $location;
  quiz = {
    title: '',
    description: '',
    questions: [{
      content: '',
      options: [{
        text: ''
      }],
      answer: '',
    }],
  };

  /*@ngInject*/
  constructor($scope, $http, $location) {
    this.$scope = $scope;
    this.$http = $http;
    this.$location = $location;
  }

  addQuestion() {
    this.quiz.questions.push({
      content: '',
      options: [{
        text: '',
      }],
      answer: '',
    });
  }

  removeQuestion(index) {
    this.quiz.questions.splice(index, 1);
  };

  addOption(question) {
    question.options.push({});
  }
    
  removeOption(question, index) {
    question.options.splice(index, 1);
  };

  submitQuiz() {
    this.$http.post('/api/quiz', this.quiz)
      .then(response => {
        this.$location.path('/quiz');
      });
  }
}

export default angular.module('odonataApp.quizCreate', [ngRoute])
  .config(routes)
  .component('quizCreate', {
    template: require('./quizCreate.pug'),
    controller: QuizCreateComponent,
    controllerAs: 'vm'
  })
  .name;
