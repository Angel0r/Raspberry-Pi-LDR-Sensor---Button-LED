'use strict';

var fs = require('fs');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function FileWatcher(filePath, options) {
  this.filePath = filePath;
  this.options = options || { interval: 50 };
  this._watch();
}

util.inherits(FileWatcher, EventEmitter);

FileWatcher.prototype._timerId = null;
FileWatcher.prototype._previousValue = null;

FileWatcher.prototype.stop = function() {
  clearInterval(this._timerId);
};

FileWatcher.prototype._watch = function() {
  this._timerId = setInterval(function() {
    var value = fs.readFileSync(this.filePath, { encoding: 'utf-8' });
    if (this._previousValue !== null && this._previousValue !== value) {
      this.emit('change', value);
    }
    this._previousValue = value;
  }.bind(this), this.options.interval);
};

module.exports = FileWatcher;
