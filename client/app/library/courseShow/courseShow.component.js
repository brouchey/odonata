'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './courseShow.routes';

export class CourseShowComponent {
  $http;
  $routeParams;
  course = {};

  /*@ngInject*/
  constructor($scope, $http, $routeParams) {
    this.$scope = $scope;
    this.$http = $http;
    this.$routeParams = $routeParams;
  }

  $onInit() {
    this.loadCourse();
  }

  loadCourse() {
    this.$http.get('/api/courses/' + this.$routeParams.id)
    .then(response => {
      this.course = response.data;
    });
  }

}

export default angular.module('odonataApp.courseShow', [ngRoute])
  .config(routes)
  .component('courseShow', {
    template: require('./courseShow.pug'),
    controller: CourseShowComponent,
    controllerAs: 'vm'
  })
  .name;
