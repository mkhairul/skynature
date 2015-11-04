app.controller('LogisticController',
 ['$scope', '$alert', '$rootScope', '$http',
  function($scope, $alert, $rootScope, $http){
  
  $scope.couriers = [];    
  $scope.courier = {};
  $scope.newCourier = function(){
      $scope.courier = {};
      $scope.courier.action = 'new';
  }
  $scope.hideNewCourier = function(){ $scope.courier.action = '' };
  $scope.newCondition = function(){
      if($scope.courier.conditions == undefined)
      {
          $scope.courier.conditions = [];
      }
      $scope.courier.conditions.push({});
      console.log($scope.courier);
  }
  $scope.clearCondition = function(index){
      $scope.courier.conditions.splice(index, 1);
  }
  
  $scope.countries = [
      { name: 'Malaysia', code: 'MYS' },
      { name: 'Brunei', code: 'BRN' },
      { name: 'Vietnam', code: 'VNM' }
  ]
  
  $scope.compare = ['>', '>=', '<', '<='];
      
  $http.get($rootScope.url + 'logistic')
  .success(function(data){
      for(var i in data)
      {
          data[i].conditions = JSON.parse(data[i].conditions);
      }
      $scope.couriers = data;
  })
  
  $scope.selectCourier = function(obj)
  {
      $scope.courier = obj;
      $scope.courier.action = 'update';
  }
      
  $scope.saveCourier = function(){
      var data = $scope.courier;
      var action = '';
      var post = {};
      if(data.action == 'new')
      {
          action = 'create';
          post = { 'name':data.name, 'conditions':JSON.stringify(data.conditions) };
      }
      else if(data.action == 'update')
      {
          action = 'update';
          post = { 'id': data.id, 'name':data.name, 
                   'conditions':JSON.stringify(data.conditions) }
      }
      
      $http.post($rootScope.url + 'logistic/' + action, post)
      .success(function(data){
          $scope.showError = false;
          if(action == 'create')
          {
            $scope.courier.id = data.id;
            $scope.couriers.push($scope.courier);
          }
          $scope.courier = {};
      })
      .error(function(data){
          $scope.showError = true;
          $scope.errorMessage = data.message;
      });
  }
  
  $scope.confirmDelete = function(confirm)
  {
      if(confirm === true)
      {
          $http.post($rootScope.url + 'logistic/remove', {id:$scope.setDeleteCourier.item.id})
          .success(function(data){
              $scope.couriers.splice($scope.setDeleteCourier.index, 1);
          })
          .error(function(data){
              console.log(data);
          })
      }
  }
  
  $scope.setDeleteCourier = function(item, index){
      $scope.setDeleteCourier.item = item;
      $scope.setDeleteCourier.index = index;
      
  }
  
  $scope.newPrice = function(item){
      if(item.prices == undefined)
      {
          item.prices = [];
      }
      item.prices.push({});
      console.log(item);
  }
  $scope.clearPrice = function(item, index){
      item.prices.splice(index, 1);
  }
}]);