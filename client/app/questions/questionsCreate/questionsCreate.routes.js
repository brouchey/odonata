'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/questions/create', {
      template: '<questions-create></questions-create>',
      authenticate: 'user'
    });
}
