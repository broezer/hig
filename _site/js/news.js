'use strict';
console.log('load nieuwsbrief');

var higApp = angular.module('hig', ['ngSanitize', 'ngTouch', 'angular-carousel']);

  higApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
  });


higApp.controller('NewsCtrl', function ($scope, $http) {

  $http.get('http://www.hetindustriegebouw.nl/wp-json/wp/v2/nieuwsbrief')
   .success(function(data){
     $scope.news = data[0];
     $scope.blocks = data[0].acf.nieuwsbrief_blokken;
     //console.log($scope.blocks);
   });
});


higApp
.directive('lazyImage', function($http) {
   return function($scope, element, attrs){
     attrs.$observe('lazySrc', function(){
       $http.get('http://www.hetindustriegebouw.nl/wp-json/wp/v2/media/' + attrs.lazySrc)
       .success(function(data){
         if (data.status === 'error'){
           //console.log(attrs.lazySrc);
         }else{
          var url = data.guid.rendered;
           element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'contain'
          });
           //console.log($scope.postImg);
         }
       });
     });
   };
 });
