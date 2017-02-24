'use strict';

export default class ProfileController {
	picFile;

  /*@ngInject*/
  constructor($location, $http, Auth, Upload, $timeout) {
    'ngInject';

    this.$location = $location;
    this.$http = $http;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.Upload = Upload;
    this.$timeout = $timeout;
  }

  // ng-file-upload
  uploadPic(file) {

  	console.log(this.getCurrentUser().name);
  	console.log(file);

    file.upload = this.Upload.upload({
      url: './api/users/avatar/upload',
      // data: {username: this.getCurrentUser().name, file: file},
      data: {file: file},
   	});

   //  file.upload.then(function (response) {
   //    this.$timeout(function () {
   //      file.result = response.data;
   //    });
   //  }, function (response) {
   //    if (response.status > 0)
   //      console.log(response.status);
   //    	console.log(response.data);
   //  }, function (evt) {
   //    // Math.min is to fix IE which reports 200% sometimes
   //    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
   //  });
   
  }

}