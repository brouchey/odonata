'use strict';

export default class ProfileController {
	userAvatar;

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

  hasAvatar() {
    if (this.getCurrentUser().avatar != null) {
      return true;
    } else {
      return false;
    }
  }

  // ng-file-upload
  uploadAvatar(file) {
    file.upload = this.Upload.upload({
      url: '/api/users/avatar/upload',
      data: {file: file, 'username': this.getCurrentUser()._id}
   	}).then(response => {
      this.userAvatar = null;
    });
  }

}