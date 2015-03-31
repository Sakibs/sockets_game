/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(startX, startY, pType) {
	var x = startX,
		y = startY,
		type = pType,
		id,
		moveAmount = 2;

	var getX = function() {
	    return x;
	};

	var getY = function() {
	    return y;
	};

	var getType = function() {
		return type;
	};

	var setX = function(newX) {
	    x = newX;
	};

	var setY = function(newY) {
	    y = newY;
	};

	var setType = function(newType) {
		type = newType;
	};

	var getColor = function() {
		switch(type) {
			case 0:
				return "green";
			case 1: 
				return "blue";
			case 2:
				return "red";
			default:
				return "black";
		}
	}

	var update = function(keys) {
		var prevX = x,
		    prevY = y;

		// Up key takes priority over down
		if (keys.up) {
			y -= moveAmount;
		} else if (keys.down) {
			y += moveAmount;
		};

		// Left key takes priority over right
		if (keys.left) {
			x -= moveAmount;
		} else if (keys.right) {
			x += moveAmount;
		};

		return (prevX != x || prevY != y) ? true : false;
	};

	var draw = function(ctx) {
		// subtract half to center the player
		ctx.fillStyle = getColor();
		ctx.fillRect(x-10, y-10, 20, 20);
	};

	return {
		update: update,
		getX: getX,
		getY: getY,
		getType: getType,
		setX: setX,
		setY: setY,
		setType: setType,
		draw: draw
	}
};