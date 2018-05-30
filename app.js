var express = require('express');
var firebase = require('firebase');
var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res){
    console.log("hello world");
    res.send('first application');
});

  // Set the configuration for your app
  // TODO: Replace with your project's config object
  var config = {
    apiKey: "AIzaSyAOqrmjzfJ90wC2JLwzAKyMStxWQaBjvv4",
    authDomain: "thephonelab-934e4.firebaseapp.com",
    databaseURL: "https://thephonelab-934e4.firebaseio.com/",
    storageBucket: "bucket.appspot.com"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var ref = firebase.app().database().ref();
  var dataSaved = false
  var reqBodyData = {}
  app.post('/saveCustomer', function(req, res){
    console.log('\n\n\nreq.body',req.body)

    var customersRef = ref.child('Customers');
    customersRef.push(req.body); 
    reqBodyData = req.body
      // Creates a new ref with a new "push key"
    //customersRef.set(obj);    // Overwrites the path
    //customersRef.update(obj); // Updates only the specified attributes 
    dataSaved = true
    res.json({
        messagea: 'succes',
        dataa: customersRef,
        info:req.body
    });
});


app.get('/getCustomer', function(req, res){
    if (dataSaved == true){
        console.log("yes, new customer exists");
        // res.sendStatus(200);
        // res.writeHead({status:200});
        res.json({
            status:200,
            data: reqBodyData
        });  
        dataSaved = false  
    }else{
        // res.sendStatus(404);
        res.json({
            status:404,
            message:'no new customer for now'
        });  
    }
});


app.listen(3000, function(){
    console.log('app is listening on port 3000')
});