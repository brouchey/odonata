'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/exchange/create', {
      template: '<questions-create></questions-create>',
      authenticate: 'user'
    });
}
