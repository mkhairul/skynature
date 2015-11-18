app.controller('SalesController',
  ['$window', '$scope', '$rootScope', '$http', '$filter',
  function($window, $scope, $rootScope, $http, $filter){
  
  $scope.sale = {};
  $scope.sales = [];
  $scope.products = [];
  $scope.users = [];
      
  $http.get($rootScope.url + 'sales')
  .success(function(data){
      $scope.sales = data;
      console.log($scope.sales);
  })
  .error(function(data){
  });
      
  $http.get($rootScope.url + 'products')
  .success(function(data){
      $scope.products = data;
      console.log($scope.products);
  })
  .error(function(data){
  });
      
  $http.get($rootScope.url + 'users')
  .success(function(data){
      $scope.users = data;
      console.log($scope.users);
  })
  .error(function(data){
  });
      
  $scope.hideAddEditUser = function(){
      $scope.addEditUser = false;
      $scope.selected_parent = '';
  }
  
  $scope.saveSales = function(){
      $http.post($rootScope.url + 'sales/create', $scope.sale)
      .success(function(data){
          
          $http.get($rootScope.url + 'sales')
          .success(function(data){
              $scope.sales = data;
              console.log($scope.sales);
          })
          .error(function(data){
          });
          
          //$scope.sale.id = data.id
          //$scope.sales.push($scope.sale);
          //$scope.sale = {};
          $scope.addEditUser = false;
          
          
      })
      .error(function(data){
      });
  }
}]);