const express = require('express')
const app = express()

//app.use(express.static('learn-chef' + '/index.html'))

var bodyParser = require('body-parser')
var path = require('path');

//requirejs is not really used in this project.
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

//to parse the POST request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))

require('./public/bot')();

//display the index.html page (it does this automatically)
app.get('/', function (req, res) {
    //res.sendFile('index.html', { root: __dirname } );
    //res.sendFile('main.css', {root: __dirname})
})

//after the user has entered a request and so forth.
app.post('/', function (req, res) {
    var someText = req.body.usrInput
    //send the response back to the view as an array (JavaScript natively does not have tuples according to my understanding)
    var bot_reply = ['' , ''];

    if (!/home/i.test(someText)){
        bot_reply = replyBot(someText);
        res.contentType('json');
        res.send({ reply: bot_reply});
    } else {
        //for some reason including the getTime() in the bot.js would not return appropriate value. However, this code ended up working. Probably has to do with asynchronous functionality. Can possibly be fixed by
        //passing the response to getTime(). This requires more investigation.
        getTime(function(finalTime){
            bot_reply = ['Searching for the best route...', 'It will take ' + finalTime];
            res.contentType('json');
            res.send({reply: bot_reply});
        });
    }


})

//see if the port is listening.
app.listen(3000, function () {
  console.log('visit localhost:3000 !')
})

//asynchronous funciton to return the time obtained from Google Directions API back to the view
function getTime(callback){
    var url = "".concat("https://maps.googleapis.com/maps/api/directions/json?origin=", config.work_lat,",",config.work_long, "&destination=",
    config.home_address, "&key=", config.api_key);
    //console.log(url);
    request(url, function(error, response, body){
        var jsonObject = JSON.parse(body);
        time = jsonObject['routes'][0]['legs'][0]['duration']['text'];
        callback(time);
    })

}
