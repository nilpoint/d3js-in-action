/**
 * # d3.timer(callback[, delay[, time]]) <>

  Schedules a new timer, invoking the specified callback repeatedly until the timer is stopped. An optional numeric delay in milliseconds may be specified to invoke the given callback after a delay; if delay is not specified, it defaults to zero. The delay is relative to the specified time in milliseconds; if time is not specified, it defaults to now.

  The callback is passed the (apparent) elapsed time since the timer became active. For example:

  var t = d3.timer(function(elapsed) {
    console.log(elapsed);
    if (elapsed > 200) t.stop();
  }, 150);
  This produces roughly the following console output:

  3
  25
  48
  65
  85
  106
  125
  146
  167
  189
  209
 */

var t = d3.timer(function(elapsed) {
  console.log(elapsed);
  if (elapsed > 200) t.stop();
}, 150);