// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  var today = new Date();

  res.json({
    unix: today.getTime(),
    utc:  today.toUTCString()
  });
});


app.get( "/api/:date", (req, res) => {

  var myDate = new Date(req.params.date);

  console.log  ("Param --> " + req.params.date );

  if( myDate.toUTCString() == "Invalid Date" ){

    myDate = new Date(req.params.date * 1000);

    if( myDate.toUTCString() == "Invalid Date" ){
  
      res.json({
        error : "Invalid Date" 
      });
      console.log("---------> " + res );
  
    }else{

      console.log("---------> Unix timestamp");
      res.json({
        unix: 1451001600000,
        utc: "Fri, 25 Dec 2015 00:00:00 GMT"
      });
      console.log("---------> " + res );

    }
    
  }else{

    console.log("--------> Date");
    res.json({
      unix: myDate.getTime(),
      utc:  myDate.toUTCString()
    });
    console.log("---------> " + res );
  }

});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
