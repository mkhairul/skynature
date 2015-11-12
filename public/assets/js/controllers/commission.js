app.controller('CommissionController',
  ['$window', '$scope', '$rootScope', '$http', '$filter',
  function($window, $scope, $rootScope, $http, $filter){
      
  $scope.commissions = [];
  $scope.commission = {};
      
  $http.get($rootScope.url + 'settings/commission')
  .success(function(data){
      $scope.commissions = data;
  })
  .error(function(data){
  });
  
  $scope.hideAddEdit = function(){
      $scope.addEdit = false;
  }
  
  $scope.save = function(){
      console.log($scope.commission);
      $http.post($rootScope.url + 'settings/commission/create', $scope.commission)
      .success(function(data){
          $scope.commission.id = data.id
          $scope.commissions.push($scope.commission);
          $scope.commission = {};
      })
      .error(function(data){
      });
  }
  
  $scope.enableCommission = function(item){
      item.enabled = 1;
      $http.post($rootScope.url + 'settings/commission/update', item)
      .success(function(data){
          
      })
      .error(function(data){
          item.enabled = 0;
          console.log('error enabling commission');
      })
  }
  
  $scope.deleteCommission = function(item){
      $http.post($rootScope.url + 'settings/commission/delete', item)
      .success(function(data){
          $http.get($rootScope.url + 'settings/commission')
          .success(function(data){
              $scope.commissions = data;
          })
          .error(function(data){
          });
      })
      .error(function(data){
          item.enabled = 0;
          console.log('error deleting commission');
      })
  }
}])
      