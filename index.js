var app = require('express')();
var users = require('./users');
var bodyParser = require('body-parser');
var port = process.env.port || 7777;

var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : '192.168.44.158',
    user     : 'testapi',
    password : 'testapi1#@!',
    database : 'testapi',

});
 connection.connect(function(err){
     if(!err){
         console.log("Database is Connected");
     }else{
         console.log("Error connecting databases");
     }
 });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

app.get('/',function(req,res){

    res.status(200).json({massage:'hooray! welcom to our api!'});
    
});

app.get('/index',function(req,res){
    res.send('<h1>This is index page</h1>');
});


app.get('/user', function (req, res) {
    res.status(200).json(users.findAll());
});

app.get('/user/:id', function (req, res) {
    var id = req.params.id;
    
    var userx = users.findById(id);
    if(userx != null){
    res.status(200).json(userx);
    }else{
    res.status(404).json({message:'not found'});
    }
    
});

app.post('/newuser', function (req, res) {
    var json = req.body;
    res.status(200).send('Add new ' + json.name + ' Completed!');
});

app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});

