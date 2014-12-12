
var joystickIsTracking = false;

function initializeJoystick() {
	console.log("hi");
	var container = document.getElementById('joystick');
	var outerCircle = document.getElementById('outer-circle');
	var innerCircle = document.getElementById('inner-circle');
	
	outerCircle.addEventListener("mousedown", function(event) {
		processMouse(event);
	});
	outerCircle.addEventListener("touchstart", function(event) {
		processTouch(event);
	});
	

	outerCircle.addEventListener("mouseleave", function(event) {
		moveJoystick(0,0);
		resetMove();
	});
	outerCircle.addEventListener("mouseup", function(event) {
		moveJoystick(0,0);
		resetMove();
	});
	outerCircle.addEventListener("touchend", function(event) {
		moveJoystick(0,0);
		resetMove();
	});

	outerCircle.addEventListener("mousemove", function(event) {
		processMouse(event);
	});
	outerCircle.addEventListener("touchmove", function(event) {
		processTouch(event);
	});

}

function processMouse(event) {
	var normalizedPos = normalize([event.clientX, event.clientY]);
	var deviation = getDeviation(normalizedPos[0], normalizedPos[1]);
	moveJoystick(deviation[0], deviation[1]);
	movePlayer(deviation[0], deviation[1]);
}

function normalize(pos) {
	var container = document.getElementById('joystick');
	var bound = container.getBoundingClientRect();
	
	//if there are multiple touches, take the first one
	var normalX = pos[0];
	var normalY = pos[1];
	//normalize values
	if (normalX > bound.right) normalX = bound.right;
	if (normalX < bound.left) normalX = bound.left;
	if (normalY < bound.top) normalY = bound.top;
	if (normalY > bound.bottom) normalY = bound.bottom;

	return [normalX, normalY];
}

function processTouch(event) {
	if (!joystickIsTracking) return;

	//if there are multiple touches, take the first one
	var touch = event.changedTouches[0];
	
	var normalizedPos = normalize([touch.pageX, touch.pageY]);
	var deviation = getDeviation(normalizedPos[0], normalizedPos[1]);

	moveJoystick(deviation[0], deviation[1]);
	movePlayer(deviation[0], deviation[1]);
}

function moveJoystick(dx, dy) {
	var outerCircle = document.getElementById('outer-circle');
	var innerCircle = document.getElementById('inner-circle');
	var innerCircleRadius = innerCircle.getBoundingClientRect().width / 2;
	
	innerCircle.style.left = (innerCircleRadius + dx) + 'px';
	innerCircle.style.top = (innerCircleRadius + dy) + 'px';	
}

function getDeviation(clickX, clickY) {
	var outerCircle = document.getElementById('outer-circle');
	var jc = outerCircle.getBoundingClientRect();
	// centerX and centerY are position of center of outerCircle
	// relative to the document body
	var centerX = jc.left + (jc.width / 2);
	var centerY = jc.top + (jc.height / 2);
	// dx and dy are the amounts of deviation from innerCircle's stable position
	var dx = clickX - centerX;
	var dy = clickY - centerY;
	return [dx, dy];
}

function movePlayer(dx, dy) {
	dy = -dy;
	var angle = Math.atan(dy / dx);
	if (dx < 0) { angle += Math.PI; }
	if (dx > 0 && dy < 0) { angle += 2 * Math.PI; }
	var tolerance = Math.PI / 8;
	var moveRight = false;
	var moveLeft = false;
	var moveUp = false;
	var moveDown = false;
	if (angle < Math.PI / 2 - tolerance || angle > Math.PI * 3 / 2 + tolerance) {
		moveRight = true;
	}
	if (angle < Math.PI * 3 / 2 - tolerance && angle > Math.PI / 2 + tolerance) {
		moveLeft = true;
	}
	if (angle > tolerance && angle < Math.PI - tolerance) {
		moveUp = true;
	}
	if (angle > Math.PI + tolerance && angle < Math.PI * 2 - tolerance) {
		moveDown = true;
	}
	command['LEFT'] = moveLeft;
	command['RIGHT'] = moveRight;
	command['DOWN'] = moveDown;
	command['UP'] = moveUp;
}

function resetMove() {
	command['LEFT'] = false;
	command['RIGHT'] = false;
	command['DOWN'] = false;
	command['UP'] = false;
}



