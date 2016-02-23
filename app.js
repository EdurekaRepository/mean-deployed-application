var express=require('express');
var bodyParser=require('body-parser');

var app=express();

var db=require('./models/db.js');
var routes=require('./routes/route.js');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req,res) {
  res.sendFile('public/index.html');
});

app.get('/employee',routes.getEmployees);
app.post('/employee',routes.addEmployee);
app.delete('/employee/:id',routes.deleteEmployee);
app.get('/employee/:id',routes.getEmployee);
app.put('/employee/:id',routes.updateEmployee);

var port = process.env.PORT || 8080;

var server=app.listen(port,function(req,res){
    console.log("Catch the action at http://localhost:"+port);
});


