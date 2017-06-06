'use strict';

var fs = require('fs');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var FileWatcher = require('./lib/file-watcher');

function GPIO(pin, mode) {
  this.pin = pin;
  if (mode === GPIO.IN || mode === GPIO.OUT) {
    this.mode = mode;
  } else {
    console.warn('No such mode: ' + mode);
  }
  initPin(pin, mode);
  if (mode === GPIO.IN) {
    new FileWatcher(GPIO.GPIO_PATH + 'gpio' + pin + '/value')
      .on('change', function(value) {
        this.emit('data', value);
      }.bind(this));
  }
}

util.inherits(GPIO, EventEmitter);

GPIO.GPIO_PATH = '/sys/class/gpio/';
GPIO.IN = 'in';
GPIO.OUT = 'out';

GPIO.prototype.pin = null;
GPIO.prototype.mode = null;
GPIO.prototype._value = null;

GPIO.prototype.val = function(value) {
  var mode = this.mode;
  var pin = this.pin;
  if (mode === GPIO.IN) {
    this._value = readPin(pin);
  } else if (mode === GPIO.OUT && value !== undefined) {
    writePin(pin, value);
    this._value = value;
  }
  return this._value;
};

/**
 * Initialize pin for reading/writing the pin.
 *
 * @param {Number} pin Pin number.
 * @param {String} mode in or out mode.
 */
function initPin(pin, mode) {
  if (!fs.existsSync(GPIO.GPIO_PATH + 'gpio' + pin)) {
    fs.writeFileSync(GPIO.GPIO_PATH + 'export', pin);
    fs.writeFileSync(GPIO.GPIO_PATH + 'gpio' + pin + '/direction', mode);
  } else {
    destroyPin(pin);
    initPin(pin, mode);
  }
}

/**
 * Destroy the pin.
 *
 * @param {Number} pin Pin number.
 */
function destroyPin(pin) {
  fs.writeFileSync(GPIO.GPIO_PATH + 'unexport', pin);
}

/**
 * Read value of the pin.
 *
 * @param {Number} pin Pin number.
 */
function readPin(pin) {
  return fs.readFileSync(GPIO.GPIO_PATH + 'gpio' + pin + '/value', { encoding: 'utf-8' });
}

/**
 * Write value into the pin.
 *
 * @param {Number} pin Pin number.
 * @param {Number} value Pin status: 0 or 1.
 */
function writePin(pin, value) {
  fs.writeFileSync(GPIO.GPIO_PATH + 'gpio' + pin + '/value', value);
}

module.exports = GPIO;
