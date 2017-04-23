var http = require('http');
var sys   = require('util'),
    spawn = require('child_process').spawn,
    ldr = spawn('python', ["sensor.py"]),
    io = require('socket.io')(http);
var button1;
var server = http.createServer(function(req, res){
        console.log('Request was made!');
var Gpio = require('onoff').Gpio,
  led = new Gpio(18, 'out'),
  button = new Gpio(17, 'in', 'rising');

ldr.stdout.on('data', function (output) {
    var ldrvalue = String(output);
   console.log(ldrvalue);
});
button.watch(function (err, value) {
  if (err) {throw err;}
  led.writeSync(value);
  if (value === 1) {
        button1 = "The LED is ON!";
        console.log(button1)
  }
});
process.on('SIGINT', function () {
  led.unexport();
  button.unexport();
});
res.end('hello!');
});
server.listen(1234);
