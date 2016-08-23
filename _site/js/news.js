'use strict';

var customInterpolationApp = angular.module('hig', ['ngSanitize']);

  customInterpolationApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
  });


customInterpolationApp
.controller('NewsCtrl', function ($scope, $http) {
  $http.get('http://www.hetindustriegebouw.nl/wp-json/wp/v2/nieuwsbrief')
   .success(function(data){
     $scope.news = data[0];
     $scope.blocks = data[0].acf.nieuwsbrief_blokken;
     //console.log($scope.blocks);
   });

   $scope.getImage = function(id) {
       console.log('Hello');
       //console.log(event.target.id);
       console.log(id);
       $http.get('http://www.hetindustriegebouw.nl/wp-json/wp/v2/media/' + id)
        .success(function(data){
          //$scope.news = data[0];
          $scope.image = data.guid.rendered;
          var el = event.target;
          console.log(el);
          console.log($scope.image);
        });
     };




});


angular.module('hig')
 .directive('lazyImage', function($http) {
     return function($scope, element, attrs){
       attrs.$observe('lazySrc', function(){
         $http.get('http://www.hetindustriegebouw.nl/wp-json/wp/v2/media/' + attrs.lazySrc)
         .success(function(data){
           if (data.status === 'error'){
             //console.log(attrs.lazySrc);
           }else{
             $scope.content = data.guid.rendered;;
             //console.log($scope.postImg);

           }
         });

       });

     };
   });
