app.controller('UserController',
 ['$scope', '$alert', '$rootScope', '$http',
  function($scope, $alert, $rootScope, $http){
 
 $scope.user = {};
 $scope.users = [];
  
 $http.get($rootScope.url + '/users')
 .success(function(data){
     $scope.users = data;
 })
 
 $scope.newUser = function(){
     $scope.user = {};
     $scope.user.action = 'new';
 }
 
 $scope.hideNewUser = function(){
     delete $scope.user.action;
 }
 
 $scope.selectUser = function(item){
     $scope.user = item;
     $scope.user.action = 'update';
 }
 
 $scope.saveUser = function(){
     var action = '';
     var user_data = $scope.user;
     if(user_data.action == 'new')
     {
         action = 'create';
     }
     else
     {
         action = 'update';
     }
     $http.post($rootScope.url + 'user/' + action, $scope.user)
     .success(function(data){
         if(user_data.action == 'new')
         {
            $scope.user.id = data.id;
            $scope.users.push($scope.user);
         }
         delete $scope.user.action;
         delete $scope.error;
     })
     .error(function(data){
         $scope.error = []
         $scope.error.message = data.message;
     });
 }
 
 $scope.confirmDelete = function(confirm)
  {
      if(confirm === true)
      {
          $http.post($rootScope.url + 'user/remove', {id:$scope.setDeleteUser.item.email})
          .success(function(data){
              $scope.users.splice($scope.setDeleteUser.index, 1);
          })
          .error(function(data){
              console.log(data);
          })
      }
  }
 
 $scope.setDeleteUser = function(item, index){
     $scope.setDeleteUser.item = item;
     $scope.setDeleteUser.index = index;
 }
      
}]);