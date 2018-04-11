var URL = "192.168.100.11";
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var http = require('http');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var socketio = require('socket.io');
var ip = require('ip');
var app = express();
var io = require('socket.io')(3009, {pingTimeout: 36000000} )
var esp1 = io.of('/esp1') //path
var middleware = require('socketio-wildcard')();   // de ba't dc tat ca cac socket.emit tu client
esp1.use(middleware);

app.listen(3002);

var cors = require('cors');
app.use(cors());

app.use(function(req, res, next) { //allow cross origin requests
  var allowedOrigins = [URL +":4200"];
  var origin = req.headers.origin;
  console.log(origin);
  if(allowedOrigins.indexOf(origin) > -1){
      res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});


// ko can ------------------------------------------------------------
io.on('connection', function(socket) {	
  console.log("Socket client connected to server");

  socket.on('disconnect', function(message){
    console.log("Socket client " + message + " disconnected???");
  })	
});

// --------------------------------------------------------------------
var conn = mysql.createConnection({
  host    : 'localhost',
  user    : 'root',
  password: 'boy159357',
  database: 'simone'
})  
conn.connect(function(err) {
  if (err) { console.log('connect mysql err'); 
          throw err}
  console.log('You are now connected mysql');
});

esp1.on('connection', function(socket){
	console.log('esp1 connected');

	socket.on('disconnect', function(){
		console.log("esp1 disconnected")
	})

	socket.on('initial', function(packet){
    console.log(packet);
    conn.query('SELECT delay_time, move_time, isActive from simonedb where id = 1', function(err, results){
      if (err) {console.log('select from mysql err'); throw err}
      else {
        if (results[0].isActive)
          esp1.emit("change", results[0].delay_time + " " + results[0].move_time);
        else esp1.emit("change", "0 0");
      }
    })
  })
})


app.get('/getDataLine', function(req, res){
  var line = req.param('line');
  conn.query('SELECT id, delay_time, move_time from simonedb where line = ' + line, function(err, results){
    if (err) {console.log('select from mysql err'); throw err}
    else {
      res.send(results);
    }
  })  
});

app.get('/getDataView', function(req, res){
  var line = req.param('line');

  conn.query('SELECT id, delay_time, move_time, counter, counter_delay from simonedb where isActive = true and line = ' + line, function(err, results){
    if (err) {console.log('select from mysql err'); throw err}
    else {
      res.send(results);
    }
  })  
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.post('/changeData', function(req, res){
  var id = req.body.id;
  var delay_time = req.body.delay_time;
  var move_time = req.body.move_time;
  
  conn.query('update simonedb set delay_time = ' + delay_time +  ', move_time = ' + move_time + ' where id = ' + id, function(err, results){
    if (err) {console.log('update from mysql err'); throw err}
    else {
      if (id == 1){
        console.log(delay_time + " " + move_time)
        esp1.emit("change", delay_time + " " + move_time);
      }
      console.log('update success');
      res.send('success');
    }
  })
})

app.post('/pauseLine', function(req, res){
  var line = req.param('line');
  if (line == 1){
    esp1.emit("change", "0 0");
  }
  conn.query('SELECT id from simonedb where line = ' + line + ' and isActive = true', function(err, results){
    if (err) {console.log('update from mysql err in pause Line at server'); throw err}
    else{
      var j;
      for (j = 0; j < results.length; j++)
        if (results[j].id == 1)
          esp1.emit("change", "0 0");
    }
  })
  conn.query('update simonedb set isActive = false where line = ' + line, function(err, results){
    if (err) {console.log('update from mysql err in pause Line at server'); throw err}
    else{
      console.log('Pauseline success in server');
      res.send('success');
    }
  }) 
})

app.post('/start', function(req, res){
  console.log(' in start from server');
  var id = req.body.id;
  var delay_time = req.body.delay_time;
  var move_time = req.body.move_time;

  conn.query('update simonedb set isActive = true where id = ' + id, function(err, results){
    if (err) {console.log('update from mysql err in start at server'); throw err}
    else{
      console.log('start success in server');
      res.send('success');
    }
  })
  if (id == 1)
    esp1.emit("change_start", delay_time + " " + move_time);

})

app.post('/pause', function(req, res){
  console.log(' in pause from server');
  var id = req.body.id;
  if (id == 1){
    esp1.emit("change", "0 0");
  }
  conn.query('update simonedb set isActive = false where id = ' + id, function(err, results){
    if (err) {console.log('update from mysql err in pause at server'); throw err}
    else{
      if (id == 1){
        esp1.emit("change", "0 0");
      }
      console.log('pause success in server');
      res.send('success');
    }
  })
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
