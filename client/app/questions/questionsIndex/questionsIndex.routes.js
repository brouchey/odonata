'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/questions', {
      template: '<questions-index></questions-index>'
    })
}

// .when('/questions', {
//       template: '<questions-index></questions-index>',
//       resolve: {
//           query: function() {
//           	return {};
//           }
//       },
//     })
//     .when('/users/:userId/starred', {
//       template: '<questions-index></questions-index>',
//       resolve: {
// 	      query: function($routeParams) {
// 	        return {
// 	          $or: [
// 	            {'stars': $routeParams.userId},
// 	            {'answers.stars': $routeParams.userId},
// 	            {'comments.stars': $routeParams.userId},
// 	            {'answers.comments.stars': $routeParams.userId},
// 	          ]
// 	        };
// 	      }
//       },
//     })
//     .when('/users/:userId', {
//       template: '<questions-index></questions-index>',
//       resolve: {
//           query: function($routeParams) {
//             return {user: $routeParams.userId};
//           }
//         },
//     })