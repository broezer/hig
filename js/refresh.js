function refresh(){
  window.location.replace("/overview");

};

var timer;

$(document).ready(function(){
  window.clearTimeout(timer);
  timer = window.setTimeout(refresh, 1000*30*15);
});
