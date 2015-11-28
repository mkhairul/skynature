app.controller('CommissionController',
  ['$window', '$scope', '$rootScope', '$http', '$filter', '$routeParams',
  function($window, $scope, $rootScope, $http, $filter, $routeParams){
  
	// Get all child BVs
	$scope.pageTitle = 'Commission';
	$scope.commissions = [];
		
	$scope.retrieveBV = function(user_id){
		$http.post($rootScope.url + 'user/children/bv', { id: user_id})
		.success(function(data){
			console.log(data);
			$scope.bv = data.bv;
		})
		.error(function(data){
			console.log('error retrieving bv');
		})
	}
	
	$http.get($rootScope.url + 'settings/commission')
  .success(function(data){
			console.log(data);
      $scope.commissions = data;
  })
  .error(function(data){
  });
	
	$scope.$watch('bv', function(val){
		if(val)
		{
			$scope.total_bv = 0;
			for(var i in $scope.bv)
			{
				for(var j in $scope.bv[i].data.bv)
				{
					$scope.total_bv += parseInt($scope.bv[i].data.bv[j].value);
				}
			}
		}
	});
		
	$scope.getCommission = function(level){
		var result = $filter('filter')($scope.commissions, { "level":level });
		return (result.length > 0) ? result[0]:{};
	}
		
	if($routeParams.usr)
	{
		console.log('user defined');
		var user_id = $routeParams.usr;
		$scope.retrieveBV(user_id);
	}
	else
	{
		$scope.retrieveBV();
	}
		
	$scope.calculateCommission = function(comm_rate, value){
		if(comm_rate == undefined){ return ''; }
		if(comm_rate.indexOf('%') >= 0)
		{
			return (parseInt(comm_rate) / 100) * value
		}
		else
		{
			return comm_rate;
		}
	}
}]);
