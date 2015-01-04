var express = require('express');
var Pushover = require('node-pushover');
var config = require('./settings.json');
var push = new Pushover({
    token: config.settings.token,
    user: config.settings.user
});


var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.post('/', function(req, res){
    //push.send("Motion Detected", "- no callback");
    // A callback function is defined:
    push.send("Alert", "Motion Detected", function (err, res){
        if(err){
            console.log("We have an error:");
            console.log(err);
            console.log(err.stack);
        }else{
            console.log("Message send successfully");
            console.log(res);
        }
    });
    console.log('POST /');
    console.dir(req.body);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('thanks');
});

app.get('/', function(request, response) {
  response.send('Node Pushover App is now active');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});


// No callback function defined:
            

