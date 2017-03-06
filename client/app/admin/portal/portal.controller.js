'use strict';

export default class AdminPortalController {
  users: Object[];

  /*@ngInject*/
  constructor(User, $location, Auth) {
    // Use the User $resource to fetch all users
    this.users = User.query();

    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

  // also in components/navbar/navbar.component.js and account/profile/profile.controller.js
  hasAvatar() {
    if (this.getCurrentUser().avatar != null) {
      return true;
    } else {
      return false;
    }
  }

  // also in admin/users/users.controller.js
  userHasAvatar(user) {
    if (user.avatar != null) {
      return true;
    } else {
      return false;
    }
  }

}
