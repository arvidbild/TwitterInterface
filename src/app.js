//"use strict"

//Global variables
var twit = require("twit");
var pug = require("pug");
var express = require("express");
var app = express();
var keys = require("../config.js");

//Gets the static assets
app.use(express.static('public'));

//Set up the view engine
app.set("view engine", "pug");
app.set("views", "./public/views");


//Gets the passwords etc by using the twit-module
var Twitter = new twit ({
  consumer_key:         keys.consumer_key,
  consumer_secret:      keys.consumer_secret,
  access_token:         keys.access_token,
  access_token_secret:  keys.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})


//Start the express server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
}) 


//-------------------------------------------------------
//Gets the data from twitter
//--------------------------------------------------------

app.get('/', function (req, res) {

    
//Get the profile name and profile pic from my Twitter account
Twitter.get("account/verify_credentials", { id_str: "arvid_bild" }, function (err, data, response) {
    
//create a new objects where we store the data from twitter.     
var object = new Object();    

    
    //get the 5 recent tweets,#retweets,#likes and date of tweet.  
    Twitter.get("statuses/user_timeline", { id_str: "arvid_bild" }, function (err, data, response) {
        object.tweets = data;
    

        //get your 5 most recent friends, profile image, real name, screen-name
        Twitter.get("friends/list", {screen_name: "ArvidBild"}, function (err,data,response) {    
            object.friends = data.users;
            
            //get your 5 most recent private messages, date and time message was sent.
            Twitter.get("direct_messages", {id_str: "arvid_bild"}, function (err,data,response) {
                object.direct_messages = data;
    
                //res.render('template.jade', { variableNameToUseInsideJadeTemplate : value });
                res.render('index', {object: object});
                
                //console.log(object);
                console.log(object);
                
    
                }); //closing Twitter.get("direct_messages"
            }); //Twitter.get("friends/list",
        }); //closing Twitter.get("statuses/user_timeline"
    }); //closing Twitter.get("account/verify_credentials"
}); //closing the request and response
