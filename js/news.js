'use strict';
console.log('load nieuwsbrief');

var higApp = angular.module('hig', ['ngSanitize', 'ngTouch', 'angular-carousel']);

  higApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
  });


higApp.controller('NewsCtrl', function ($scope, $http) {
  $scope.blocks = [];
  $scope.news = [];
  $scope.pushbericht = [];

  $http.get('http://www.hetindustriegebouw.nl/wp-json/wp/v2/nieuwsbrief')
   .success(function(data){
     $scope.news = data[0].acf.nieuwsbrief_blokken;
     both();
   });

   $http.get('http://www.hetindustriegebouw.nl/wp-json/wp/v2/pushbericht')
    .success(function(data){
      $scope.first = data[0];
      both();
    });

   var both = function(){
     if ( $scope.news.length > 0) {
       $scope.news.push($scope.first);
       $scope.blocks = $scope.news ;
       //console.log($scope.blocks);
     }
   }


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
