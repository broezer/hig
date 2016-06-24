(function($) {



  function reload(){
    location.reload();

  };

  var timer;

  $(document).ready(function(){
    window.clearTimeout(timer);
    timer = window.setTimeout(reload, 15 * 60 * 1000);
  });



})(jQuery);
