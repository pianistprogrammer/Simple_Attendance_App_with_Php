var toastr;
toastr.options = {
    "closeButton": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};
var app = angular.module('myApp', ['ngRoute']);
app.factory("services", ['$http', function($http) {
  var serviceBase = 'services/'
    var obj = {};
    obj.getAttendance = function(){
        return $http.get(serviceBase + 'getattendance');
    }
    obj.getHcf = function(){
        return $http.get(serviceBase + 'gethcf');
    }
    obj.average = function(){
        return $http.get(serviceBase + 'average');
    }
    obj.getAverageDistrictReport = function(){
        return $http.get(serviceBase + 'getAverageDistrictReport');
    }
    obj.getAverageHcfReport = function(){
        return $http.get(serviceBase + 'getAverageHcfReport');
    }
    obj.getAverageGroupReport = function(){
        return $http.get(serviceBase + 'getAverageGroupReport');
    }
     
    obj.register = function(){
        return $http.post(serviceBase + 'register', user)
        .then(function (results) {
           return results;
        })
    }
    obj.login = function(){
        return $http.post(serviceBase + 'login', user)
        .then(function (results) {
           return results;
        })
    }
     

    obj.insertAttendance = function (attendance) {
    return $http.post(serviceBase + 'insertAttendance', attendance)
        .then(function (results) {
        return results;
    });

	}
   obj.inserthcf = function (attendance) {
    return $http.post(serviceBase + 'inserthcf', hcf)
        .then(function (results) {
        return results;
    });

  };
 
	obj.deleteCustomer = function (id) {
	    return $http.delete(serviceBase + 'deleteCustomer?id=' + id).then(function (status) {
	        return status.data;
	    });
	};

    return obj;   
}]);
 
app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.
      when('/', {
        title: 'entries',
        templateUrl: 'partials/entry.html',
        controller: 'entryCtrl'
      })
      .when('/report', {
        title: 'View Report',
        templateUrl: 'partials/report.html',
        controller: 'entryCtrl'
        
      })
      .when('/groupreport', {
        title: 'View Group Report',
        templateUrl: 'partials/groupreport.html',
        controller: 'entryCtrl'
        
      })
      .when('/hcf', {
        title: 'House fellowship',
        templateUrl: 'partials/hcf.html',
        controller: 'hcfCtrl'
        
      })
      .when('/login', {
        title: 'Login',
        templateUrl: 'partials/login.html',
        controller: 'UserCtrl'
        
      })
      .when('/register', {
        title: 'User registration',
        templateUrl: 'partials/register.html',
        controller: 'UserCtrl'
        
      })
      .otherwise({
        redirectTo: '/'
      });
}]);
app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);