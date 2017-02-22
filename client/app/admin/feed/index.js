'use strict';

import angular from 'angular';
import AdminFeedController from './feed.controller';

export default angular.module('odonataApp.feed', [])
  .controller('AdminFeedController', AdminFeedController)
  .name;
