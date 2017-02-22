'use strict';

export default class AdminUsersController {
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

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}
