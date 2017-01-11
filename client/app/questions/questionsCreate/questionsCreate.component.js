'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');

import routes from './questionsCreate.routes';

export class QuestionsCreateComponent {
  $http;
  $location;
  // isLoggedIn: Function;

  /*@ngInject*/
  constructor($scope, $http, $location, Auth) {
    this.$scope = $scope;
    this.$http = $http;
    this.$location = $location;
    // this.isLoggedIn = Auth.isLoggedInSync;
  }

  submitQuestion() {
    this.$http.post('/api/questions', this.$scope.question)
      .then(response => {
        this.$location.path('/questions');
      });
  }

}

export default angular.module('odonataApp.questionsCreate', [ngRoute])
  .config(routes)
  .component('questionsCreate', {
    template: require('./questionsCreate.pug'),
    controller: QuestionsCreateComponent,
    controllerAs: 'vm'
  })
  .name;
