'use strict';

import angular from 'angular';
import AdminLogsController from './logs.controller';

export default angular.module('odonataApp.logs', [])
  .controller('AdminLogsController', AdminLogsController)
  .name;