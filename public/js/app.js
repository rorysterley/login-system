(function() {
  var app = angular.module('loginSystem', []);

  app.controller('LoginViewController', function() {
    this.view = 'login';

    this.isSet = function(checkView) {
      return this.view === checkView;
    };

    this.setView = function(setView) {
      this.view = setView;
    };
  });

  app.controller('LoginController', ['$scope', function($scope) {
    this.credentials = {};

    this.login = function(credentials) {
      var user = $scope.userData.userList[credentials.email];

      // Check if credentials are valid
      if(user) {
        if(user.password === credentials.password) {
          $scope.view.setView('logged-in');
          $scope.userData.activeUser = user;
          this.credentials = {};
        } else {
          alert("Email and password do not match");
        }
      } else {
        alert("That email is not on recored. Double check spelling.");
      }
    };
  }]);

  app.controller('UserDataController', ['$scope', function($scope) {
    this.userList = {};
    this.user = {};

    // The currently log in user
    this.activeUser = {};
    this.updatingUser = {};

    this.addUser = function(user) {
      // if user email does not exist, add user.
      // else alert, user email is already in use.
      if(!this.userList[user.email]) {
        this.userList[user.email] = user;
        this.activeUser = user;
        this.user = {};
        $scope.view.setView('logged-in');
      } else {
        alert("That email is already in use by another user.");
      }
    };


    this.editUserFirstName = function(update) {
      this.userList[this.activeUser.email].firstName = update.firstName;
      this.activeUser.firstName = update.firstName;
      this.updatingUser.firstName = '';
    };

    this.editUserLastName = function(update) {
      this.userList[this.activeUser.email].lastName = update.lastName;
      this.activeUser.lastName = update.lastName;
      this.updatingUser.lastName = '';
    };

    this.editUserEmail = function(update) {
      if(!this.userList[update.email]) {
        delete this.userList[this.activeUser.email];
        this.activeUser.email = update.email;
        this.userList[update.email] = this.activeUser;
        this.updatingUser.email = '';
      } else {
        alert("That email is already in use by another user.");
      }
    };

    this.editUserPassword = function(update) {
      this.userList[this.activeUser.email].password = update.password;
      this.activeUser.password = update.password;
      this.updatingUser.password = '';
    };

    this.deleteUser = function(user) {
      var sure = confirm("Are you sure you want to delete your account?\nThis can NOT be undone!");

      if(sure) {
        delete this.userList[user.email];
        delete this.activeUser;
        delete this.updatingUser;
        $scope.view.setView('login');
      }
    };
  }]);
})();