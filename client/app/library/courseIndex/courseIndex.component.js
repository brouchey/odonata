'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './courseIndex.routes';

export class CourseIndexComponent {
  $http;
  $routeParams;
  isLoggedIn: Function;
  getCurrentUser: Function;
  courses = [];

  /*@ngInject*/
  constructor($scope, $http, $routeParams, Auth) {
    this.$scope = $scope;
    this.$http = $http;
    this.$routeParams = $routeParams;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

  $onInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.$http.get('/api/courses/')
    .then(response => {
      this.courses = response.data;
    })
  }

}

export default angular.module('odonataApp.courseIndex', [ngRoute])
  .config(routes)
  .component('courseIndex', {
    template: require('./courseIndex.pug'),
    controller: CourseIndexComponent,
    controllerAs: 'vm'
  })
  .name;
