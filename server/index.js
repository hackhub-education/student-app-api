var app = require('express')();
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
config = require('./config');

mongoose.connect(config.database);

var studentSchema = {
    firstName: String,
    lastName: String,
    school: String,
    age: Number,
    email: String,
    skills: [String]
}

var Student = mongoose.model('Students', studentSchema, 'students');

app.use(cors());
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'api-docs.html'))
});

app.get('/student', function(req, res) {
    Student.find().select('firstName').exec(function(err, doc) {
        res.send(doc);
    })
});

app.get('/student/:id', function(req, res) {
    Student.findById(req.params.id, function(err, doc) {
        res.send(doc);
    });
});

app.post('/student', function(req, res) {
    console.log(req.body)
    var newStudent = new Student(req.body);
    newStudent.save(function(err, doc) {
        res.send(doc);
    });
});

app.put('/student/:id', function(req, res) {
    Student.update({_id: req.params.id}, {$set: {
        "name": req.body.name,
        "age": req.body.age,
        "school": req.body.school
    }}, function(err, doc) {
       res.send(doc)
    });
});

app.delete('/student/:id', function(req, res) {
    Student.remove({_id: req.params.id}, function(err, doc) {
        res.send(doc)
    })
});

app.get('/chat', function(req, res) {
    res.sendFile(path.join(__dirname, '../client', 'chat.html'));
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg) {
       console.log('message: ' + msg);
       io.emit('response message', msg);
    });
    socket.on('disconnect', function() {
       console.log('user disconnected');
    });
});

http.listen(process.env.PORT || 3000, function(){
    console.log('listening on *:3000');
});