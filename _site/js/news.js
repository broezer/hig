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
  $scope.services = {type: 'services' , title:'Services', image: '../assets/svg/services.svg'} ;

  Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('');
  };

  var date = new Date();
  $scope.current = date.yyyymmdd();
  console.log($scope.current );

  $http.get('http://www.hetindustriegebouw.nl/wp-json/wp/v2/nieuwsbrief')
   .success(function(data){
     //$scope.news = data[0].acf.nieuwsbrief_blokken;
    var values = data[0].acf.nieuwsbrief_blokken;
     console.log(values);
     $scope.news.push($scope.services);
     $.each(values, function(){
       var item = $(this);
       console.log(item[0].blok_date);
       var itemDate =  item[0].blok_date;
       if(itemDate == null || itemDate=='' ||itemDate >= $scope.current){
         console.log(item[0]);
         var block = item[0]
         $scope.news.push(block);
         console.log($scope.news);
       }
     });


     setTimeout(function () {
       $scope.$apply(function () {
           //$scope.new = "Timeout called!";
           console.log('call function');
           both();
         });
     }, 2000);

   });

   $http.get('http://www.hetindustriegebouw.nl/wp-json/wp/v2/pushbericht')
    .success(function(data){
      var pushDate = data[0].acf.feat_data;
      if(pushDate == null || pushDate=='' ||pushDate >= $scope.current){
        $scope.first = data[0];
      }else{
        both();
      }


    });

   var both = function(){
     if ( $scope.news.length > 0) {
       $scope.news.push($scope.first);
       $scope.blocks = $scope.news ;
       console.log($scope.blocks);
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

 higApp
 .directive('bgImage', function($http) {
    return function($scope, element, attrs){
      attrs.$observe('bgSrc', function(){
           var url = attrs.bgSrc;
            element.css({
             'background-image': 'url(' + url +')',
             'background-size' : 'contain',
             'height' : '75%'
           });
            //console.log($scope.postImg);

      });
    };
  });
