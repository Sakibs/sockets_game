var port = 8000,
	express = require("express"),
	app = express(),
	util = require("util"),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	Player = require("./Player").Player;

server.listen(port);

var	players = [];

// app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
	socket.on("new player", onNewPlayer);
	socket.on("move player", onMovePlayer);
	socket.on("disconnect", onClientDisconnect);
  		
});


function onClientDisconnect() { 
	console.log('Player disconnected: '+ this.id);

	var removePlayer = playerById(this.id);
	// Player not found
	if (!removePlayer) {
		console.log("Player not found: "+this.id);
		return;
	};
	// Remove player from players array
	players.splice(players.indexOf(removePlayer), 1);
	// Broadcast removed player to connected socket clients
	this.broadcast.emit("remove player", {id: this.id});
};

function onNewPlayer(data) {
	console.log('Player connected: '+ this.id)
	console.log(data)
	var newPlayer = new Player(data.x, data.y, data.type);
	newPlayer.id = this.id;

	this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY(), type: newPlayer.getType()});
	// this.to('others').emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY()}); 

	var i, existingPlayer;
	for (i = 0; i < players.length; i++) {
		existingPlayer = players[i];
		this.emit("new player", {
			id: existingPlayer.id, 
			x: existingPlayer.getX(), 
			y: existingPlayer.getY(), 
			type: existingPlayer.getType()
		});
	};
	// Add new player to the players array
	players.push(newPlayer);

}

function onMovePlayer(data) {
	// Find player in array
	var movePlayer = playerById(this.id);
	// Player not found
	if (!movePlayer) {
		console.log("Player not found: "+this.id);
		return;
	};
	// Update player position
	movePlayer.setX(data.x);
	movePlayer.setY(data.y);
	// Broadcast updated position to connected socket clients
	this.broadcast.emit("move player", {id: movePlayer.id, x: movePlayer.getX(), y: movePlayer.getY()});
}

function playerById(id) {
	var i;
	for (i = 0; i < players.length; i++) {
		if (players[i].id == id)
			return players[i];
	};
	return false;
};