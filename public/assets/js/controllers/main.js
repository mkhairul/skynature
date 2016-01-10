app.controller('MainController',
  ['$location', '$scope', '$animate', 'localStorageService', '$alert', '$timeout', '$rootScope', 'PlaceholderTextService', 'ngTableParams', '$filter', '$http', '$window',
  function($location, $scope, $animate, localStorageService, $alert, $timeout, $rootScope, PlaceholderTextService, ngTableParams, $filter, $http, $window){

  $scope.accounting = accounting;
  $scope.theme_colors = [
    'pink','red','purple','indigo','blue',
    'light-blue','cyan','teal','green','light-green',
    'lime','yellow','amber','orange','deep-orange'
  ];
		
	// retrieve current authenticated user
	$http.get('auth/user')
	.success(function(data){
		console.log(data);
		$rootScope.user = data;
	});
		
	$rootScope.$watch('user', function(newVal, oldVal){
		if(newVal)
		{
			$http.get('settings/membership/' + newVal.membership_id)
			.success(function(data){
				$rootScope.user.membership = data;
				console.log($rootScope.user);
			});
		}
	});

  $scope.fillinContent = function(){
    $scope.htmlContent = 'content content';
  };

  // theme changing
  $scope.changeColorTheme = function(cls){
    $rootScope.$broadcast('theme:change', 'Choose template');//@grep dev
    $scope.theme.color = cls;
  };

  $scope.changeTemplateTheme = function(cls){
    $rootScope.$broadcast('theme:change', 'Choose color');//@grep dev
    $scope.theme.template = cls;
  };

  if ( !localStorageService.get('theme') ) {
    theme = {
      color: 'theme-pink',
      template: 'theme-template-dark'
    };
    localStorageService.set('theme', theme);
  }
  localStorageService.bind($scope, 'theme');

  $scope.showIntroduction = function(){
    intro.show();
  };
		
	$scope.goTo = function(url){
		console.log('going to: ' + url);
		$location.path(url);
	}

  /*
  var intro = $alert({
    title: 'Hi there!',
    content: 'Testing.',
    placement: 'top',
    type: 'theme',
    container: '.alert-container-top-right',
    show: false,
    animation: 'mat-grow-top-right'
  });
  $timeout(function(){
      intro.show();
  }, 1750);
  */   
      
  // adding demo data
  var data = [];
  for (var i = 1; i <= 50; i++){
    data.push({
      icon: PlaceholderTextService.createIcon(),
      firstname: PlaceholderTextService.createFirstname(),
      lastname: PlaceholderTextService.createLastname(),
      paragraph: PlaceholderTextService.createSentence()
    });
  }
  $scope.data = data;

  $scope.tableParams = new ngTableParams({
    page: 1,            // show first page
    count: 10,
    sorting: {
      firstname: 'asc'     // initial sorting
    }
  }, {
    filterDelay: 50,
    total: data.length, // length of data
    getData: function($defer, params) {
      var searchStr = params.filter().search;
      var mydata = [];

      if(searchStr){
        searchStr = searchStr.toLowerCase();
        mydata = data.filter(function(item){
          return item.firstname.toLowerCase().indexOf(searchStr) > -1 || item.lastname.toLowerCase().indexOf(searchStr) > -1;
        });

      } else {
        mydata = data;
      }

      mydata = params.sorting() ? $filter('orderBy')(mydata, params.orderBy()) : mydata;
      $defer.resolve(mydata.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    }
  });
  
  $scope.product = [];
  $scope.searchProduct = function(val)
  {
      $http.post($rootScope.url + '/product', {'keyword': val}).
      success(function(data){
          if(data.status == 'error')
          {
              $scope.showError = true;
          }
          else
          {
              $scope.showError = false;
              $scope.product = data;
              $scope.product_keyword = null;
              
              /*
              for(var i in $scope.product)
              {
                  $scope.getAvailibility($scope.product[i]);
              }
              */
          }
      })
      .error(function(data){
          $scope.showError = true;
      });
      console.log('enter!');
  }
  
  $scope.checkChildren = function(item){
      $http.post($rootScope.url + 'user/children', item)
      .success(function(data){
          console.log(data);
          item.total_children = data.total_children;
      })
      .error(function(data){
      });
  }
  
  $scope.selectProduct = function(item){
      console.log(item);
      $scope.selected_product = item;
  }
  
  $scope.clearSelected = function(){ delete $scope.selected_product };
  $scope.openURL = function(url){  $window.open(url, '_blank'); }
  
  
  
}]);
