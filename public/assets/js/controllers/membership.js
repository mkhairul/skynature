app.controller('MembershipController',
  ['$window', '$scope', '$rootScope', '$http', '$filter',
  function($window, $scope, $rootScope, $http, $filter){
	
	$scope.membership = {};
	
	$http.get($rootScope.url + 'settings/membership')
	.success(function(data){
		$scope.memberships = data;
		console.log(data);
	})
	.error(function(data){
		
	})
	
	$scope.showAddEdit = function(row){
			$scope.membership = row;
			$scope.addEdit = true;
	}
	
	$scope.hideAddEdit = function(){
      $scope.addEdit = false;
  }
	
	$scope.deleteRole = function(item){
			console.log('deleting?')
      $http.post($rootScope.url + 'settings/membership/delete', item)
      .success(function(data){
					console.log('deleted!')
          $http.get($rootScope.url + 'settings/membership')
          .success(function(data){
              $scope.memberships = data;
          })
          .error(function(data){
          });
      })
      .error(function(data){
          item.enabled = 0;
          console.log('error deleting membership');
      })
  }
	
	$scope.save = function(){
      $http.post($rootScope.url + 'settings/membership/create', $scope.membership)
      .success(function(data){
					if($scope.membership.id != undefined)
					{
						$filter = $filter('filter')($scope.memberships, { id: $scope.membership.id })[0];
						console.log($filter);
					}
					else
					{
						$scope.membership.id = data.id
						$scope.memberships.push($scope.membership);
					}          
          $scope.membership = {};
					$scope.hideAddEdit();
      })
      .error(function(data){
      });
  }
}])