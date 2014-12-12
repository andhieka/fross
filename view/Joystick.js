document.addEventListener('DOMContentLoaded', function() {
	initializeJoystick();
});

var joystickIsTracking = false

function initializeJoystick() {
	var container = document.getElementById('joystick');
	var outerCircle = document.getElementById('outer-circle');
	var innerCircle = document.getElementById('inner-circle');
	
	container.addEventListener("mouseleave", function(event) {
		moveJoystick(0,0);
		joystickIsTracking = false;
	});

	outerCircle.addEventListener("mousedown", function(event) {
		joystickIsTracking = true;
	});

	outerCircle.addEventListener("mouseup", function(event) {
		joystickIsTracking = false;
		moveJoystick(0,0);
	});

	outerCircle.addEventListener("mousemove", function(event) {
		if (!joystickIsTracking) return;
		var deviation = getDeviation(event.clientX, event.clientY);
		moveJoystick(deviation[0], deviation[1]);
		movePlayer(deviation[0], deviation[1]);
	});
}

function moveJoystick(dx, dy) {
	var outerCircle = document.getElementById('outer-circle');
	var innerCircle = document.getElementById('inner-circle');
	var innerCircleRadius = innerCircle.getBoundingClientRect().width / 2;
	
	console.log(dx, dy);
	innerCircle.style.left = (innerCircleRadius + dx) + 'px';
	innerCircle.style.top = (innerCircleRadius + dy) + 'px';
	
	console.log(innerCircle.style.left, innerCircle.style.top);
}

function getDeviation(clickX, clickY) {
	var outerCircle = document.getElementById('outer-circle');
	var jc = outerCircle.getBoundingClientRect();
	// centerX and centerY are position of center of outerCircle
	// relative to the document body
	var centerX = jc.left + (jc.width / 2);
	var centerY = jc.top + (jc.height / 2);
	console.log(centerX, centerY);
	// dx and dy are the amounts of deviation from innerCircle's stable position
	var dx = clickX - centerX;
	var dy = clickY - centerY;
	return [dx, dy];
}

function movePlayer(dx, dy) {
	var dy = -dy;
	var angle = Math.atan(dy / dx);
	if (dx < 0) angle += Math.PI;
	if (dx > 0 && dy < 0) angle += 2 * Math.PI;
	var tolerance = Math.PI / 8;
	console.log(angle);
	if (angle < Math.PI / 2 - tolerance || angle > Math.PI * 3 / 2 + tolerance) {
		moveRight();
	}
	if (angle < Math.PI * 3 / 2 - tolerance && angle > Math.PI / 2 + tolerance) {
		moveLeft();
	}
	if (angle > tolerance && angle < Math.PI - tolerance) {
		moveUp();
	}
	if (angle > Math.PI + tolerance && angle < Math.PI * 2 - tolerance) {
		moveDown();
	}
}

function moveUp() {
	console.log("up");
}

function moveDown() {
	console.log("down");
}

function moveLeft() {
	console.log("left");
}

function moveRight() {
	console.log("right");
}


