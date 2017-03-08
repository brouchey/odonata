import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './home.routes';

//- from LoginController
type User = {
  name: string;
  email: string;
  password: string;
};

export class MainController {
  $http;

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

  //- for Auth
  isLoggedIn: Function;
  getCurrentUser: Function;

  /*@ngInject*/
  constructor($http, $scope, Auth, $location) {
    this.$http = $http;
    this.Auth = Auth;
    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

  $onInit() {
    
  }

  login(form) {
    this.submitted = true;

    if(form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
        .then(() => {
          // Logged in, redirect to home
          this.$location.path('/');
        })
        .catch(err => {
          this.errors.login = err.message;
        });
    }
  }
}

export default angular.module('odonataApp.home', [ngRoute])
  .config(routing)
  .component('home', {
    template: require('./home.pug'),
    controller: MainController
  })
  .name;
