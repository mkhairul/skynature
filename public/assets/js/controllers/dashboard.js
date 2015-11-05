app.controller('DashboardController',
  ['$window', '$scope', '$rootScope', '$interval', 'colorService', '$http',
  function($window, $scope, $rootScope, $interval, colorService, $http){

  $rootScope.pageTitle = 'Dashboard';

  $http.get($rootScope.url + 'users')
  .success(function(data){
      $scope.users = data;
      console.log($scope.users);
  })
  .error(function(data){
  });
      
  $scope.hideAddEditUser = function(){
      $scope.addEditUser = false;
  }
      
}]);
