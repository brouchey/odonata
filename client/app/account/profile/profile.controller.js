'use strict';

export default class ProfileController {

  /*@ngInject*/
  constructor($location, Auth, FileUploader) {
    'ngInject';

    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.uploader = new FileUploader({
    	url: '',
    	filters: [{
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
          var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
      		return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    	}]
    });
  }

}

