app.controller('CategoryController',
 ['$scope', '$alert', '$rootScope', '$http',
  function($scope, $alert, $rootScope, $http){
      
  $http.get($rootScope.url + 'categories')
  .success(function(data){
      $scope.category = data;
  })
}]);