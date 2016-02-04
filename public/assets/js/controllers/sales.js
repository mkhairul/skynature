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
			console.log('products');
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
	
	$scope.confirmDelete = function(confirm)
  {
      if(confirm === true)
      {
          $http.post($rootScope.url + 'sales/remove', {id:$scope.deleteItem.item.id})
          .success(function(data){
              $scope.sales.splice($scope.deleteItem.index, 1);
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
 
 $scope.selectedProduct = {};
 $scope.selectProduct = function(item){
	 $scope.selectedProduct = item;
 }
 
 $scope.confirmSelect = function(){
	 console.log($scope.selectedProduct);
	 if($scope.sale == undefined){ $scope.sale = {} }
	 if($scope.sale.product == undefined){ $scope.sale.product = {}; }
	 
	 $scope.sale.product = $scope.selectedProduct;
	 $scope.selectedProduct = {};
 }
 
 $scope.calculateDiscount = function(discount_rate, value){
		if(discount_rate == undefined){ return ''; }
		if(discount_rate.indexOf('%') >= 0)
		{
			return (parseInt(discount_rate) / 100) * value
		}
		else
		{
			return discount_rate;
		}
	}
 
}]);