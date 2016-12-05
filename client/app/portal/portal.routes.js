'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/portal', {
      template: '<portal></portal>',
      authenticate: 'user'
    });
}
