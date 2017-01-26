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
      ofType: '',
      content: '',
      options: [''],
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
      ofType: '',
      content: '',
      options: [''],
      answer: 'Answer',
    });
  }

  removeQuestion(index) {
    this.quiz.questions.splice(index, 1);
  };

  addOption(question) {
    question.options.push('');
  }
    
  removeOption(question, index) {
    question.options.splice(index, 1);
  };

  clearOptionsAnswer(question) {
    question.options = [''];
    question.answer = 'Answer';
  }

  splitQuestion(question) {
    question.options = question.content.split(' ');
  }

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
