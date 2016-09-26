'use strict';

higApp
.controller('PostsCtrl', function ($scope, $http) {
  $http.get('http://www.hetindustriegebouw.nl/wp-json/wp/v2/posts?filter[posts_per_page]=-1')
   .success(function(data){
     $scope.posts = data;
     //console.log($scope.blocks);
   });

   $scope.loading = false;

   $scope.selectPost = function(e){
     console.log('select post');
     $scope.loading = false;
     $scope.selectedPost = [

     ];
      console.log($scope.loading);
      $('.feature').show();
      $('#toggle').removeClass('active').addClass('article-active');

     $http.get('http://www.hetindustriegebouw.nl/wp-json/wp/v2/posts/' + e)
     .success(function(data){

       if (data.status === 'error'){
         //console.log(attrs.lazySrc);
       }else{
         $scope.selectedPost = data;
         $scope.loading = true;
         console.log($scope.selectedPost);
         console.log($scope.loading);
       }
     });
   }

});

(function($) {

  $('.posts').hide();
  $('.feature').hide();

  $('#toggle').click(function() {
    var $this = $(this);
    if($this.hasClass('active')){
      $('.posts').hide();
      $this.removeClass('active');
      $('.header').removeClass('invert');
    }else if($this.hasClass('article-active')){
      $this.removeClass('article-active').addClass('active');
      $('.feature').hide();
    }
    else{
      $('.posts').show();
      $this.addClass('active');
      $('.header').addClass('invert');
    }
  });



})(jQuery);
