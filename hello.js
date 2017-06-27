const express = require('express')
const app = express()

//app.use(express.static('learn-chef' + '/index.html'))

var bodyParser = require('body-parser')
var path = require('path');

var requirejs = require('requirejs')

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});


//FOR THE BOT
var request = require('request')
var config = require('./public/configs.json')
var time = ""

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))

require('./public/bot')();


app.get('/', function (req, res) {
    //res.sendFile('index.html', { root: __dirname } );
    //res.sendFile('main.css', {root: __dirname})
})

app.post('/', function (req, res) {
    var someText = req.body.usrInput
    //res.send(someText)
    //console.log(someText + " Jovin")
    var bot_reply = ['' , ''];
    if (!/home/i.test(someText)){
        bot_reply = replyBot(someText);
        res.contentType('json');
        res.send({ reply: bot_reply});
    } else {
        getTime(function(finalTime){
            bot_reply = ['Searching for the best route...', 'It will take ' + finalTime];
            res.contentType('json');
            res.send({reply: bot_reply});
        });
    }


})

app.listen(3000, function () {
  console.log('visit localhost:3000 !')
})

function getTime(callback){
    var url = "".concat("https://maps.googleapis.com/maps/api/directions/json?origin=", config.work_lat,",",config.work_long, "&destination=",
    config.home_address, "&key=", config.api_key);
    console.log(url);
    request(url, function(error, response, body){
        //console.log('body:', body);
        var jsonObject = JSON.parse(body);
        //console.log(jsonObject['rows'][0]['elements'][0]['duration']['text']);
        time = jsonObject['routes'][0]['legs'][0]['duration']['text'];
        //console.log(time);
        callback(time);

    })

}
