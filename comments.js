// Create web server

var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/comments', function(req, res) {
    console.log("GET From Server");
    fs.readFile(__dirname + '/comments.json', function(err, data) {
        res.setHeader('Cache-Control', 'no-cache');
        res.json(JSON.parse(data));
    });
});

app.post('/comments', function(req, res) {
    console.log("POST From Server");
    fs.readFile(__dirname + '/comments.json', function(err, data) {
        var comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile(__dirname + '/comments.json', JSON.stringify(comments, null, 4), function(err) {
            res.setHeader('Cache-Control', 'no-cache');
            res.json(comments);
        });
    });
});

app.listen(3000);
console.log('Server is running on port 3000');