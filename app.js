const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const assert = require('assert');
const Tweet = require(__dirname + '/tweet');

var app = express();

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.listen(1997, ()=>{
  console.log("Listening at port 1997");
});

mongoose.connect("mongodb://localhost:27017/actualdb", { useNewUrlParser: true });

mongoose.Promise = global.Promise;

mongoose.connection.once('open', function(){
    console.log('Connection has been made, now make fireworks...');
}).on('error', function(error){
    console.log('Connection error:', error);
});

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/views/write.html');
});

app.get('/oldPosts', (req, res)=>{
    Tweet.find({}).sort({_id: -1}).then((result)=>{
    res.send(result);
  })
});

app.post('/posts', jsonParser, (req, res)=>{

    let temp = new Tweet({
      body: req.body.tweet
    });

    temp.save().then(()=>{
      assert(!temp.isNew)
      let tempStr = [];
      Tweet.find({}).sort({_id : -1}).then((result)=>{
        res.send(result);
      })
    });

});
