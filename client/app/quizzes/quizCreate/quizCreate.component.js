'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './quizCreate.routes';

export class QuizCreateComponent {
  $http;
  $location;
  options = [];

  /*@ngInject*/
  constructor($scope, $http, $location) {
    this.$scope = $scope;
    this.$http = $http;
    this.$location = $location;
  }

  addNewOption() {
    var id = this.options.length+1;
    this.options.push({id});
    console.log('New option added');
    console.log(this.options);
  };
    
  removeOption() {
    var lastItem = this.options.length-1;
    this.options.splice(lastItem);
    console.log('Option removed');
    console.log(this.options);
  };

  submitQuiz() {
    this.$http.post('/api/quiz', this.$scope.quiz)
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
