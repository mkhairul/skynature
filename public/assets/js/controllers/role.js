app.controller('RoleController',
  ['$window', '$scope', '$rootScope', '$http', '$filter',
  function($window, $scope, $rootScope, $http, $filter){
		
	$scope.role = {};
	
	$http.get($rootScope.url + 'settings/role')
	.success(function(data){
		$scope.roles = data;
		console.log(data);
	})
	.error(function(data){
		
	})
	
	$scope.hideAddEdit = function(){
      $scope.addEdit = false;
  }
	
	$scope.deleteRole = function(item){
			console.log('deleting?')
      $http.post($rootScope.url + 'settings/role/delete', item)
      .success(function(data){
					console.log('deleted!')
          $http.get($rootScope.url + 'settings/role')
          .success(function(data){
              $scope.roles = data;
          })
          .error(function(data){
          });
      })
      .error(function(data){
          item.enabled = 0;
          console.log('error deleting role');
      })
  }
	
	$scope.save = function(){
      $http.post($rootScope.url + 'settings/role/create', $scope.role)
      .success(function(data){
          $scope.role.id = data.id
          $scope.roles.push($scope.role);
          $scope.role = {};
					$scope.hideAddEdit();
      })
      .error(function(data){
      });
  }
}])