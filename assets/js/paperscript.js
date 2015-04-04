window.scrollTo(0,1);


var triangle = new Path.RegularPolygon(view.center, 3, 100);
triangle.fillColor = '#ad21c6';
triangle.strokeColor = '#ad21c6';
triangle.selected = false;


var circle = new Path.Circle({
	center: [0, 0],
	radius: 5,
	fillColor: 'white',
	strokeColor: 'black'
});
var count = 25;
var symbol = new Symbol(circle);
// Place the instances of the symbol:
for (var i = 0; i < count; i++) {
	// The center position is a random point in the view:
	var center = Point.random() * view.size;
	var placed = symbol.place(center);
  placed.sendToBack();
	placed.scale(i / count + 0.001);
	placed.data.vector = new Point({
		angle: Math.random() * 360,
		length : (i / count) * Math.random() / 5
	});
}


var scale = false;
var o_length = triangle.length;
var c = 0;

function initializePath() {
  triangle.position = view.center;
}

function onFrame(event) {
    triangle.rotate(2);
    if (scale) {
      triangle.scale(0.7);
      if (triangle.length <= o_length) {
        scale = false;
      }
    }

    vector = view.center;

    // Run through the active layer's children list and change
    // the position of the placed symbols:
    for (var i = 0; i < count; i++) {
      var item = project.activeLayer.children[i];
      var size = item.bounds.size;
      var length = size.width / 10;
      var quadrant = item.data.vector.quadrant;
      var x_pos = item.position.x
      var y_pos = item.position.y
      if (quadrant == 1) {
        item.position = new Point(x_pos + length, y_pos - length);
      }
      if (quadrant == 2) {
        item.position = new Point(x_pos - length, y_pos + length);
      }
      if (quadrant == 3) {
        item.position = new Point(x_pos - length, y_pos - length);
      }
      if (quadrant == 4) {
        item.position = new Point(x_pos + length, y_pos + length);
      }
      keepInView(item);
    }

}

function keepInView(item) {
	var position = item.position;
	var viewBounds = view.bounds;
	if (position.isInside(viewBounds))
		return;
	var itemBounds = item.bounds;
	if (position.x > viewBounds.width + 5) {
		position.x = view.center.x;
	}

	if (position.x < -itemBounds.width - 5) {
		position.x = view.center.x;
	}

	if (position.y > viewBounds.height + 5) {
		position.y = view.center.y;
	}

	if (position.y < -itemBounds.height - 5) {
		position.y = view.center.y;
	}
}

function onResize(event) {
  initializePath();
}

function onDeviceMotion(event) {
  var accel = event.acceleration;

  var x = Math.abs(accel.x);
  var y = Math.abs(accel.y);
  var z = Math.abs(accel.z);
  var sum = x + y + z;
  if(sum > 20 & !scale) {
    triangle.scale(3);
    scale = true
  }
}

window.addEventListener("devicemotion",onDeviceMotion,false);
