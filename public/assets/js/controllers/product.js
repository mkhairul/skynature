app.controller('ProductController',
  ['$window', '$scope', '$rootScope', '$http', '$filter',
  function($window, $scope, $rootScope, $http, $filter){
  
  $scope.product = {};
  $scope.products = [];
      
  $http.get($rootScope.url + 'products')
  .success(function(data){
      $scope.products = data;
      console.log($scope.products);
  })
  .error(function(data){
  });
      
  $scope.hideAddEditUser = function(){
      $scope.addEditUser = false;
      $scope.selected_parent = '';
  }
  
  $scope.saveProduct = function(){
      $http.post($rootScope.url + 'product/create', $scope.product)
      .success(function(data){
          $scope.product.id = data.id
          $scope.products.push($scope.product);
          $scope.product = {};
          $scope.addEditUser = false;
      })
      .error(function(data){
      });
  }
}]);