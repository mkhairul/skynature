app.controller('MainController',
  ['$location', 'quoteService', '$scope', '$animate', 'localStorageService', 'todoService', '$alert', '$timeout', '$rootScope', 'PlaceholderTextService', 'ngTableParams', '$filter', '$http', '$window',
  function($location, quoteService, $scope, $animate, localStorageService, todoService, $alert, $timeout, $rootScope, PlaceholderTextService, ngTableParams, $filter, $http, $window){

  $scope.accounting = accounting;
  $scope.theme_colors = [
    'pink','red','purple','indigo','blue',
    'light-blue','cyan','teal','green','light-green',
    'lime','yellow','amber','orange','deep-orange'
  ];

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
  
  $scope.selectProduct = function(item){
      console.log(item);
      $scope.selected_product = item;
  }
  
  $scope.clearSelected = function(){ delete $scope.selected_product };
  $scope.openURL = function(url){  $window.open(url, '_blank'); }
  
  $scope.quoteService = quoteService;
  $scope.quoteItems = $scope.quoteService.getItems();
  
  $scope.addProductToQuote = function(product){
      $scope.quoteService.add(product);
  }
  $scope.removeProductFromQuote = function(index){
      $scope.quoteService.remove(index);
  }
  
  $scope.viewQuoteDetails = function(){
      if($scope.quoteItems.length > 0)
      {
        $location.path('/quote_detail');
      }
      else
      {
          var refererNotThemeforest = $alert({
            title: 'Can\'t View Quote Detail!',
            content: 'Add an item to view quote detail',
            placement: 'top-right',
            type: 'theme',
            container: '.alert-container-top-right',
            show: true,
            animation: 'mat-grow-top-right'
          });
      }
  }
  
  $scope.logout = function(){
      $http.get($rootScope.url + 'auth/logout')
      .success(function(data){
          $window.location.href = $rootScope.url;
      });
  }
  
  $scope.clearQuote = function(){
      $scope.quoteService.clear();
      $scope.quoteItems = $scope.quoteService.getItems();
  }
  
  $scope.getAvailability = function(item){
      item.availability = 'Loading';
      $http.post($rootScope.url + 'product/availability', {id:item.article_id})
      .success(function(data){
          item.availability = data.stock.availableStock;
      })
      .error(function(data){
          item.availability = 'error';
      });
  }
  
  // Get users
  $http.get($rootScope.url + 'auth/user')
  .success(function(data){
      $scope.user = data;
  })
  .error(function(){
  });
  
}]);
