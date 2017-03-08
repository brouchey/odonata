'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/', {
    template: require('./home.pug'),
    controller: 'HomeController',
    controllerAs: 'vm'
  });
}
