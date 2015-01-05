var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.listen(8000);

var tweets = [];

app.set('view engine', 'html');

// create application/json parser
var jsonParser = bodyParser.json();

app.get('/', function(req, res) {
    var title = 'Chirpie',
    header = 'Welcome to Chirpie'
    res.render('index', {
        locals: {
            'title': title,
            'header': header,
            'tweets': tweets,
            stylesheets: ['/public/style.css']
        }
    })
});

app.post('/send', jsonParser, function(req, res) {
    if (req.body && req.body.tweet) {
        tweets.push(req.body.tweet)
        res.send({status:"ok", message:"Tweet received"})
    } else {
        //no tweet?
        res.send({status:"nok", message:"No tweet received"})
    }
});

app.get('/tweets', function(req,res) {
    res.send(tweets)
})