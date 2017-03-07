'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/admin', {
    template: require('./portal/portal.pug'),
    controller: 'AdminPortalController',
    controllerAs: 'vm',
    authenticate: 'admin'
  })
  .when('/admin/feed', {
    template: require('./feed/feed.pug'),
    controller: 'AdminFeedController',
    controllerAs: 'vm',
    authenticate: 'admin'
  })
  .when('/admin/logs', {
    template: require('./logs/logs.pug'),
    controller: 'AdminLogsController',
    controllerAs: 'vm',
    authenticate: 'admin'
  })
  .when('/admin/users', {
    template: require('./users/users.pug'),
    controller: 'AdminUsersController',
    controllerAs: 'vm',
    authenticate: 'admin'
  });
}
