'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './courseIndex.routes';

export class CourseIndexComponent {
  /*@ngInject*/
  constructor() {

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
