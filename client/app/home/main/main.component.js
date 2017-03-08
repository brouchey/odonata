'use strict';
const angular = require('angular');

export class MainComponent {

	//- from LoginController
	user: User = {
    name: '',
    email: '',
    password: ''
  };
  errors = {
    login: undefined
  };
  submitted = false;
  Auth;
  $location;

  /*@ngInject*/
  constructor(Auth, $location) {
  	this.Auth = Auth;
    this.$location = $location;
  }

  //- from LoginController
  login(form) {
    this.submitted = true;

    if(form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
        .then(() => {
          // Logged in, redirect to home (portal)
          this.$location.path('/');
        })
        .catch(err => {
          this.errors.login = err.message;
        });
    }
  }

}

export default angular.module('odonataApp.main', [])
  .component('main', {
    template: require('./main.pug'),
    controller: MainComponent,
    controllerAs: 'vm'
  })
  .name;
