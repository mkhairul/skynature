app.controller('UploadController', ['$scope', 'Upload', '$timeout', '$rootScope', '$http',
																		function ($scope, Upload, $timeout, $rootScope, $http) {

  $scope.fileReaderSupported = window.FileReader !== undefined && (window.FileAPI === undefined || FileAPI.html5 !== false);

  $scope.$watch('files', function (newVal, oldVal) {
    //$scope.upload($scope.files);
  });

  progressHandler = function(evt) {
    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
  };

  successHandler = function(data, status, headers, config) {
    console.log('file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data));
  };

  thumbHandler = function(file) {
    generateThumb(file);
  };

  generateThumb = function(file) {
    if (file !== undefined) {
      if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
        $timeout(function() {
          var fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = function(e) {
            $timeout(function() {
              file.dataUrl = e.target.result;
            });
          };
        });
      }
    }
  };

  $scope.saveProduct = function () {
		$http.post($rootScope.url + 'product/create', $scope.product)
		.success(function(data){
				$scope.$parent.$parent.product.id = data.id
				$scope.$parent.$parent.products.push($scope.product);
				$scope.$parent.$parent.product = {};
				$scope.$parent.$parent.addEditUser = false;
				uploadFiles(data.id);
		})
		.error(function(data){
		});
		
		var uploadFiles = function(product_id){
			var files = $scope.files
			if (files && files.length) {
				for (var i = 0; i < files.length; i++) {
					var file = files[i];
					delete file.dataUrl;
					Upload.upload({
						url: $rootScope.url + 'product/images',
						method: 'POST',
						file: file,
						sendFieldsAs: 'form',
						fields: {
								"product_id": product_id
						}
					})
					.progress(progressHandler)
					.success(successHandler);
				}
			}
		}
  };
																			
  $scope.$watch('product_files', function(files, oldval){
		if (files !== undefined && files !== null && (typeof files === 'object')) {
			if($scope.files == undefined)
			{
				$scope.files = [];
			}
		  $scope.files = $scope.files.concat(files)
		}
	})

  $scope.$watch('files', function(files) {
    $scope.formUpload = false;
    if (files !== undefined && files !== null && files.length > 0) {
			$rootScope.product_images = $scope.files;
      for (var i = 0; i < files.length; i++) {
        $scope.errorMsg = undefined;
        (thumbHandler)(files[i]);
      }
    }
  });

}]);
