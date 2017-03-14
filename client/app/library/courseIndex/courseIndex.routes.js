'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/library/courses', {
      template: '<course-index></course-index>',
      authenticate: 'user'
    });
}
