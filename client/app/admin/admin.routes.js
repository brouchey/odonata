'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/admin', {
    template: require('./portal/admin.pug'),
    controller: 'AdminController',
    controllerAs: 'admin',
    authenticate: 'admin'
  })
  .when('/admin/feed', {
    template: require('./feed/feed.pug'),
    controller: 'AdminFeedController',
    controllerAs: 'admin',
    authenticate: 'admin'
  })
  .when('/admin/logs', {
    template: require('./logs/logs.pug'),
    controller: 'AdminLogsController',
    controllerAs: 'admin',
    authenticate: 'admin'
  })
  .when('/admin/users', {
    template: require('./users/users.pug'),
    controller: 'AdminUsersController',
    controllerAs: 'admin',
    authenticate: 'admin'
  });
}
