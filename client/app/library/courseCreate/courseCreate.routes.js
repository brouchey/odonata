'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/library/courses/create', {
      template: '<course-create></course-create>',
      authenticate: 'user'
    });
}
