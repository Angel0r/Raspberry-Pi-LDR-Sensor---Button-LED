# GPIO.JS
GPIO.JS is a node library helps developer control GPIO eaiser and faster on [Raspberry Pi][rpi] or [other boards][supported-boards] supported [Node.js][nodejs].

## Get Started
### Install
```
npm install gpio-js
```

### Blink an LED
```
var GPIO = require('gpio-js');
var led = new GPIO(44, 'out');

setInterval(function() {
  led.val(1 - led.val());
}, 1000);
```

## Features
### Event-driven Model to Get GPIO Pin Status
```
var GPIO = require('gpio-js');
var button = new GPIO(18, 'in');

button.on('data', function(value) {
  console.log('Button Pin: ' + value);
});
```

## Supported Boards
* [Raspberry Pi][rpi]
* [Linkit Smart 7688 (Duo)][linkit7688]

[nodejs]: https://nodejs.org
[rpi]: https://www.raspberrypi.org
[linkit7688]: https://labs.mediatek.com/site/global/developer_tools/mediatek_linkit_smart_7688/whatis_7688/index.gsp
[supported-boards]: https://github.com/evanxd/gpio-js#supported-boards
