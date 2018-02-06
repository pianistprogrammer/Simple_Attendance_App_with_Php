 app.controller('UserCtrl', function ($scope, $rootScope, $location, $routeParams, services, $http) {
  $scope.user = {}
   $scope.register = function (user) {
      if ($scope.user.email === "" && $scope.user.phoneNumber === "" && $scope.user.password === "" && $scope.user.username === ""){
         toastr.error ("Fill in all the fields")
      }
      if ($scope.user.password != $scope.user.confirmpassword){
      $scope.error = "Passwords must match"; 
      toastr.errorr($scope.error);    

      }
      else{
          $http.post("/attendance/services/register", $scope.user).success(function (data) {
              if (data.msg === "Account Created Successfully"){
                toastr.success(data.msg);
              }
              if (data.msg === "Email already exists"){
                toastr.error(data.msg);
              }
              $scope.user = "";
           }).error(function (response) {
            
              toastr.error("An error has occured");
         });
      }
   }
      $scope.login = function (user) {
      if ($scope.user.email === "" && $scope.user.password === "" ){
         alert ("Fill in all the fields")
      }
      else{
          $http.post("/attendance/services/login", $scope.user).success(function (data) {
              toastr.success(data.msg);
              window.location.href = "/";
           }).error(function (response) {
            
              toastr.error("An error has occured");
         });
      }
   }
  
});
