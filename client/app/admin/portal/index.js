'use strict';

import angular from 'angular';
import AdminPortalController from './portal.controller';

export default angular.module('odonataApp.adminPortal', [])
  .controller('AdminPortalController', AdminPortalController)
  .name;
