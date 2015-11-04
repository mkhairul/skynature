// routes
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'assets/tpl/dashboard.html'
  }).when('/:folder/:tpl', {
      templateUrl: function(attr){
        return 'assets/tpl/' + attr.folder + '/' + attr.tpl + '.html';
      }
    }).when('/:tpl', {
      templateUrl: function(attr){
        return 'assets/tpl/' + attr.tpl + '.html';
      }
    }).otherwise({ redirectTo: '/' });
}])


// loading bar settings
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
  cfpLoadingBarProvider.latencyThreshold = 300;
}])

// disable nganimate with adding class
.config(['$animateProvider', function($animateProvider) {
  $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
}])

.config(['$authProvider', function($authProvider) {
    $authProvider.httpInterceptor = true;
    $authProvider.withCredentials = true;
    $authProvider.tokenRoot = null;
    $authProvider.cordova = false;
    $authProvider.baseUrl = '/';
    $authProvider.loginUrl = '/auth/login';
    $authProvider.signupUrl = '/auth/signup';
    $authProvider.unlinkUrl = '/auth/unlink/';
    $authProvider.tokenName = 'token';
    $authProvider.tokenPrefix = 'jace';
    $authProvider.authHeader = 'Authorization';
    $authProvider.authToken = 'Bearer';
    $authProvider.storageType = 'localStorage';
}])

// set constants
.run(['$rootScope', 'APP', function ($rootScope, APP) {
  $rootScope.APP = APP;
}]);
