'use strict';

var myVar;

function myFunction() {
		myVar =   window.setTimeout(function(){
			$('.posts').hide();
			$('#toggle').removeClass('active');
			$('.header').removeClass('invert');
			timer = window.setTimeout(reload, interval);
		}, 10 * 1000);
}

function myStopFunction() {
	window.clearTimeout(myVar);
	console.log('stop');
}

higApp
.controller('PostsCtrl', function ($scope, $http) {
  $http.get('http://www.hetindustriegebouw.nl/wp-json/wp/v2/posts?per_page=20')
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
			myStopFunction();
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
  //Time function based on http://jsfiddle.net/tJWmH/
  var interval = 15 * 60 * 1000;

  var timer = 0;
  function reload(){
    location.reload();

  };


  function f(){
      var timer= window.setTimeout(reload, interval);
  }

  $(document).ready(function(){
    timer = window.setTimeout(reload, interval);
  });

  $('.posts').hide();
  $('.feature').hide();





  $('#toggle').click(function() {
    var $this = $(this);

    if($this.hasClass('active')){
      $('.posts').hide();
      $this.removeClass('active');
      $('.header').removeClass('invert');
      timer = window.setTimeout(reload, interval);
    }else if($this.hasClass('article-active')){
      $this.removeClass('article-active').addClass('active');
      $('.feature').hide();
			myFunction();
    }
    else{
      $('.posts').show();
      $this.addClass('active');
      $('.header').addClass('invert');
      window.clearTimeout(timer);
			myFunction();
    }
  });



})(jQuery);


(function($) {











})(jQuery);
