'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './courseCreate.routes';

export class CourseCreateComponent {
  $http;
  $location;

  /*@ngInject*/
  constructor($scope, $http, $location) {
    this.$scope = $scope;
    this.$http = $http;
    this.$location = $location;
  }

  submitCourse() {
    this.$http.post('/api/courses', this.$scope.course)
      .then(response => {
        this.$location.path('/library/courses');
      });
  }

  loadTags(query) {
    return this.$http.get('/api/courses/tags/all')
  }

}

export default angular.module('odonataApp.courseCreate', [ngRoute])
  .config(routes)
  .component('courseCreate', {
    template: require('./courseCreate.pug'),
    controller: CourseCreateComponent,
    controllerAs: 'vm'
  })
  .name;
