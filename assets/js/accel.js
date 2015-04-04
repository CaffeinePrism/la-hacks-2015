var accelData = [];
var context;
var horizon;

document.addEventListener('DOMContentLoaded', everything, false);

function retData(name) {
  return context.metric(function(start, stop, step, callback) {
    callback(null, values = accelData.slice((start - stop) / step));
  }, name);
}


function everything(event) {
  context = cubism.context()
      .serverDelay(0)
      .clientDelay(0)
      .step(500)
      .size(360);

  horizon = context.horizon();
  var foo = retData('foo');
  d3.select("#data").call(function (div) {
    div.datum(foo);

    div.append("div")
      .attr("class", "axis")
      .call(context.axis().orient("top"));

      div.append("div")
          .attr("class", "horizon")
          .call(context.horizon()
            .height(180)
            .mode("mirror")
            .colors(["#bdd7e7","#bae4b3"])
            .extent([-10, 10]));

    div.append("div")
      .attr("class", "rule")
      .call(context.rule());
  });

  window.addEventListener("devicemotion",onDeviceMotion,false);
}

function onDeviceMotion(event) {
  var doc = document.getElementById('num');
  var accelwithg = event.accelerationIncludingGravity;
  var accel = event.acceleration;
  //doc.innerHTML = 'accel: ' + JSON.stringify(accel) + '\naccelwithg:' + JSON.stringify(accelwithg) + '\n';
  //console.log('accel:', accel, 'accelwithg:', accelwithg);
  var x = Math.abs(accel.x);
  var y = Math.abs(accel.y);
  var z = Math.abs(accel.z);
  var sum = x + y + z;
  accelData.push(sum);
  if(sum > 20) { console.log(sum); }
  num.innerHTML = sum;
}
