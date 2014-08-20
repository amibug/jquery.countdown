$('.countdown_dashboard').countdown();
$('.stop').on('click', function(e){
  e.preventDefault();
  $('.countdown_dashboard').data('countdown').stop();
})
$('.start').on('click', function(e){
  e.preventDefault();
  $('.countdown_dashboard').data('countdown').start();
});
$('.update').on('click', function(e){
  e.preventDefault();
  $('.countdown_dashboard').data('countdown').update({
    diff: 3000
  });
});
$('.end').on('click', function(e){
  e.preventDefault();
  $('.countdown_dashboard').data('countdown').update({
    diff: 5,
    onEnd: function(){
      $('.countdown_dashboard').css('background', '#c0392b');
    }
  });
});




