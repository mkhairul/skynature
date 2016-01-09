app.controller('ProductController',
  ['$scope', '$rootScope', '$http', '$filter', 'Upload', '$timeout',
  function($scope, $rootScope, $http, $filter, Upload, $timeout){
  
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
  
	/*
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
	*/
	
	$scope.confirmDelete = function(confirm)
  {
      if(confirm === true)
      {
          $http.post($rootScope.url + 'product/remove', {id:$scope.deleteItem.item.id})
          .success(function(data){
              $scope.products.splice($scope.deleteItem.index, 1);
          })
          .error(function(data){
              console.log(data);
          })
      }
  }
	
	$scope.setDeleteItem = function(item, index){
		 if($scope.deleteItem == undefined){ $scope.deleteItem = {}; }
     $scope.deleteItem.item = item;
     $scope.deleteItem.index = index;
 	}
	
	$rootScope.$watch('product_images', function(files){
		if (files !== undefined && files !== null) {
			console.log(files);
		}
	})
	
}]);