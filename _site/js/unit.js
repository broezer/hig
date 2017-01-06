(function($) {

  var allUnits = $('.st0');

  $('.btn').click(function() {
      $this = $(this);
      var target = $this.attr('unit');
      var direction = $this.attr('direction');
      console.log(target);
      console.log(direction);
      $('g').attr('class', '')
      $(target).attr('class', 'active');
      $('.'+ direction).attr('class', direction + ' ' + 'active');
      $('body').addClass('active').trigger('blink');
      //if ($target.hasClass('active')){
      //}else{
      //}
    return false;
  });


  $('body').on('blink', function() {
    console.log('Change')
    if($('body').hasClass('active')){

      console.log('Is Active');

      setTimeout(function() {
       //allUnits.removeClass('active');
       $('g').attr('class', '')
       $('body').attr('class', '')
       $('.right').attr('class', 'right')
       $('.left').attr('class', 'left')
     }, 12000);
    }else{
      console.log('not Active');
    }
  });



})(jQuery);
