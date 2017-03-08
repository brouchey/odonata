'use strict';
const angular = require('angular');

//- from SignupController
type User = {
	name: string;
	email: string;
	password: string;
};

export class MainComponent {

	//- from SignupController
	user: User = {
		name: '',
		email: '',
		password: ''
	};
	errors = {};
	submitted = false;
	Auth;
	$location;

	/*@ngInject*/
	constructor(Auth, $location) {
		this.Auth = Auth;
		this.$location = $location;
	}

	//- from SignupController
	register(form) {
		this.submitted = true;

		if(form.$valid) {
			return this.Auth.createUser({
				name: this.user.name,
				email: this.user.email,
				password: this.user.password
			})
				.then(() => {
					// Account created, redirect to home
					this.$location.path('/');
				})
				.catch(err => {
					err = err.data;
					this.errors = {};
					// Update validity of form fields that match the mongoose errors
					angular.forEach(err.errors, (error, field) => {
						form[field].$setValidity('mongoose', false);
						this.errors[field] = error.message;
					});
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
