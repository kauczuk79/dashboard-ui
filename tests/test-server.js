var express = require('express'),
	app = express();
	
app.use('/test', express.static('../demos'));
app.use('/dist', express.static('../dist'));
app.use('/node_modules', express.static('../node_modules'));

var server = app.listen(3000, function() {
	console.log('Server running');
});