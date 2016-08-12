(function($) {

  var allUnits = $('.st0');
  var allCompanies = $('.company');
  var allFloors = $('.floor');
  var allMaps = $('.map');

  allCompanies.hide();

  function reset(){
    allFloors.removeClass('active');
    allMaps.removeClass('active inactive');
    $('g').attr('class', '');
  };

  function goBack(){
    window.location.replace("/");

  };

  var timer;
  var timer02;


  $(document).ready(function(){
    window.clearTimeout(timer);
    //timer = window.setTimeout(goBack, 1000*30);
  });

  $('.company').click(function() {
      allFloors.removeClass('active');
      allMaps.removeClass('active inactive');
      allMaps.addClass('inactive');
      $this = $(this);
      var target = $this.attr('unit');
      var floor = $this.attr('floor');
      //console.log(target);
      //console.log(direction);
      $('g').attr('class', '')
      $(target).attr('class', 'active');
      $(floor).addClass('active');
      //var direction = $this.attr('direction');
      //$('.'+ direction).attr('class', direction + ' ' + 'active');
      $('body').addClass('active').trigger('blink');
      //if ($target.hasClass('active')){
      //}else{
      //}
      window.clearTimeout(timer02);
      timer02 = window.setTimeout(reset, 1000*20);
      window.clearTimeout(timer);
      timer = window.setTimeout(goBack, 1000*30);

      return false;
  });



  $('.select').click(function(){
    allCompanies.hide();

    $this = $(this);
    var target = $this.attr('target');
    console.log(target);
    $('.company--'+ target).show();

    window.clearTimeout(timer);
    timer = window.setTimeout(goBack, 1000*30);

    return false;
  });




})(jQuery);
