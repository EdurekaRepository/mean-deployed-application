var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {    
    
  var updateView=function(){
         $http.get('/employee').success(function(response) {
         $scope.employees = response; 
         $scope.employee="";
        });
  };

  updateView();
  
    $scope.addEmployee = function() {
      $http.post('/employee', $scope.employee).success(function(response) {
        updateView();
      });
    };
    
    $scope.removeEmployee = function(id) {
      $http.delete('/employee/' + id).success(function(response) {
          updateView();
      });
    };
    
    $scope.editEmployee = function(id) {
      console.log(id);
      $http.get('/employee/' + id).success(function(response) {
      $scope.employee = response;
     });
   };
    
    $scope.updateEmployee = function() {
     console.log($scope.employee._id);
     $http.put('/employee/' + $scope.employee._id, $scope.employee).success(function(response) {
       updateView();
     });
    };
    

}]);




