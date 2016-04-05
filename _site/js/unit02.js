(function($) {

  var allUnits = $('.st0');
  var allCompanies = $('.company');
  var allFloors = $('.floor')

  allCompanies.hide();

  $('.company').click(function() {
      allFloors.removeClass('active');
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
    return false;
  });



  $('.select').click(function(){
    allCompanies.hide();

    $this = $(this);
    var target = $this.attr('target');
    console.log(target);
    $('.company--'+ target).show();
    return false;
  });


})(jQuery);
