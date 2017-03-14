'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './courseShow.routes';

export class CourseShowComponent {
  /*@ngInject*/
  constructor() {

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
