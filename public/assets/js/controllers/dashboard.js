app.controller('DashboardController',
  ['$window', '$scope', '$rootScope', '$interval', 'colorService', '$http', '$filter',
  function($window, $scope, $rootScope, $interval, colorService, $http, $filter){

  $rootScope.pageTitle = 'Dashboard';
  $scope.selected_parent = '';
		
	$http.get($rootScope.url + 'settings/role')
	.success(function(data){
		$scope.roles = data;
		console.log(data);
	})
	.error(function(data){
		
	})
	
	$http.get($rootScope.url + 'settings/membership')
	.success(function(data){
		$scope.memberships = data;
		console.log(data);
	})
	.error(function(data){
		
	})

  $http.get($rootScope.url + 'users')
  .success(function(data){
      $scope.users = data;
      console.log($scope.users);
  })
  .error(function(data){
  });
		
	$scope.getRole = function(id){
		if(!id){ return ''; }
		var result = $filter('filter')($scope.roles, { "id":id });
		return (result) ? result[0]:'-';
	}
	
	$scope.getMembership = function(id){
		if(!id){ return ''; }
		var result = $filter('filter')($scope.memberships, { "id":id });
		return (result) ? result[0]:'-';
	}
      
  $scope.hideAddEditUser = function(){
      $scope.addEditUser = false;
      $scope.selected_parent = '';
  }
  
  $scope.addUser = function(item){
      $scope.selected_parent = item;
      if($scope.new_user == undefined){ $scope.new_user = {} }
      $scope.new_user.parent = item;
      $scope.addEditUser = true;
  }
      
  $scope.saveUser = function(){
      $http.post($rootScope.url + 'user/create', $scope.new_user)
      .success(function(data){
					$scope.new_user.id = data.id;
					$scope.new_user.sky_id = data.sky_id;
          $scope.users.push($scope.new_user);
          $scope.new_user = {};
          $scope.addEditUser = false;
      })
      .error(function(data){
      });
  }
  
  $scope.approveUser = function(user){
      user.enabled = 1;
      $http.post($rootScope.url + 'user/update', user)
      .success(function(data){
          
      })
      .error(function(data){
          user.enabled = 0;
          console.log('error approving user');
      })
  }
  
  $scope.getParent = function(item){
      var parent = '';
      if(item.parent_id == undefined)
      {
          parent = item.parent.id 
      }
      else
      {
          parent = item.parent_id;
      }
      console.log($filter('filter')($scope.users, { id: parent }, true));
      return $filter('filter')($scope.users, { id: parent }, true);
  }
}]);
