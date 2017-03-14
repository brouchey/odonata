'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './courseCreate.routes';

export class CourseCreateComponent {
  /*@ngInject*/
  constructor() {

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
