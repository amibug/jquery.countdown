$('.countdown_dashboard')
  .eq(0).countdown().end()
  .eq(1).countdown({
    year: 0,
    month: 0,
    day: 1,
    hour: 0,
    min: 10,
    sec: 1
  }).end()
  .eq(2).countdown({
    diff: 20,
    onEnd: function () {
      alert('End')
    }
  }).end();

