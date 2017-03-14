'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/library/courses/show/:id', {
      template: '<course-show></course-show>',
      authenticate: 'user'
    });
}
