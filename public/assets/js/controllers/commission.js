app.controller('CommissionController',
  ['$window', '$scope', '$rootScope', '$http', '$filter', '$routeParams',
  function($window, $scope, $rootScope, $http, $filter, $routeParams){
  
	// Get all child BVs
	$scope.pageTitle = 'Commission';
	$scope.commissions = [];
    
    $scope.retrieveSales = function(user_id){
      $http.get($rootScope.url + 'sales/total/' + user_id)
      .success(function(data){
          console.log(data);
          $scope.total_sales = data;
      })
      .error(function(data){
      });
    }
    
    $http.get($rootScope.url + 'settings/commission/')
    .success(function(data){
      console.log(data);
      $scope.all_commissions = data;
    });
		
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
		if(parseInt(level) === 1){
			if($scope.membership !== undefined)
			{
                //console.log($scope.membership);
				var tmp = {}
				tmp.rate = $scope.membership.direct_bonus
				return tmp;
			}
		}else{
			//var result = $filter('filter')($scope.commissions, { "level":level });
			//return (result.length > 0) ? result[0]:{};
            return 0;
		}
	}
    
    
		
	if($routeParams.usr)
	{
		console.log('user defined');
		var user_id = $scope.user_id =  $routeParams.usr;
        $scope.retrieveSales(user_id);
        $scope.$watch('all_commissions', function(newVal, oldVal){
          if(newVal)
          {
            $scope.retrieveBV(user_id);
          }
        })
      
        // Retrieve user membership
        $http.get($rootScope.url + 'user/membership/' + user_id)
        .success(function(data){
          $scope.user_details = data;
        });
      
        $scope.$watch('user_details', function(newVal, oldVal){
          if(newVal)
          {
                console.log(newVal);
                $http.get($rootScope.url + 'settings/commission/' + newVal.membership_id)
                .success(function(data){
                        console.log(data);
                        $scope.commissions = data;
                })
                .error(function(data){
                });

                $http.get($rootScope.url + 'settings/membership/' + newVal.membership_id)
                .success(function(data){
                        console.log(data);
                        $scope.membership = data;
                })
                .error(function(data){
                });
            }
        });
	}
	else
	{
        $scope.$watch('all_commissions', function(newVal, oldVal){
          if(newVal)
          {
            $scope.retrieveBV();
          }
        })
      
        $rootScope.$watch('user', function(newVal, oldVal){
          $scope.retrieveSales(newVal.id);
          if(newVal)
          {
                console.log(newVal);
                $http.get($rootScope.url + 'settings/commission/' + newVal.membership_id)
                .success(function(data){
                        console.log(data);
                        $scope.commissions = data;
                })
                .error(function(data){
                });

                $http.get($rootScope.url + 'settings/membership/' + newVal.membership_id)
                .success(function(data){
                        console.log(data);
                        $scope.membership = data;
                })
                .error(function(data){
                });
            }
        });
	}
    
    $scope.getGB = function(level, membership){
      console.log(level);
      console.log(membership);
      if(level && membership)
      {
        var result = $filter('filter')($scope.all_commissions, { "level":level, "membership_id":membership })[0];
        return result.rate;
      }
      return 0;
    }
		
	$scope.calculateCommission = function(comm_rate, gb_rate, discount, value){
      if(comm_rate == undefined){ return ''; }
      if(discount.indexOf('%') >= 0)
      {
        discount = (parseInt(discount) / 100);
      }
      else
      {
        discount = 0;
      }
      if( (comm_rate.indexOf('%') >= 0 || comm_rate == 0) && gb_rate.indexOf('%') >= 0)
      {
          if(comm_rate == 0)
          {
            return ((parseInt(gb_rate)/100) - discount) * value
          }
          else
          {
            return (((parseInt(comm_rate) / 100) + (parseInt(gb_rate)/100)) - discount) * value
          }
      }
      else
      {
          return ((comm_rate + gb_rate) - discount);
      }
	}
}]);
