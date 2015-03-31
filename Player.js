/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(startX, startY, pType) {
	var x = startX,
		y = startY,
		type = pType,
		id;
	// Getters and setters
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
	// Define which variables and methods can be accessed
	return {
		getX: getX,
		getY: getY,
		getType: getType,
		setX: setX,
		setY: setY,
		setType: setType,
		id: id
	}
};
// Export the Player class so you can use it in
// other files by using require("Player").Player
exports.Player = Player;