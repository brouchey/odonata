'use strict';

import angular from 'angular';
import AdminUsersController from './users.controller';

export default angular.module('odonataApp.users', [])
  .controller('AdminUsersController', AdminUsersController)
  .name;
