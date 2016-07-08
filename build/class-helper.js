(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ClassHelper = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Stefan Wimmer <stefanwimmer128@gmail.com> on 07.07.16.
 */

const ClassHelper = function (_prototype = {}, _extend = Object, _factory = [], _bound = [])
{
    if (typeof _prototype.constructor !== "function")
        throw new Error("Constructor must be defined as function!");
    
    if (Array.isArray(_extend))
    {
        [ , _factory, _bound ] = arguments;
        _extend = Object;
    }
    
    if (typeof _extend !== "function")
        throw new Error("Extending object must have constructor method!");
    
    if (! Array.isArray(_factory))
        throw new Error("Factories must be in array!");
    
    const _class = function (...args)
    {
        _bound.forEach(bound =>
            this[bound._bound] = bound(this)
        );
        
        _factory.forEach(f =>
            Object.assign(this, f(this))
        );
        
        _prototype.constructor.call(this, (function (...args)
        {
            _extend.apply(this, args);
            Object.assign(this, _class.prototype);
        }).bind(this), ...args);
    };
    
    _class.prototype = Object.create(_extend.prototype);
    Object.assign(_class.prototype, _prototype);
    _class.prototype.constructor = _class;
    
    return _class;
};

ClassHelper.Factory = function (factory)
{
    return function (_this)
    {
        const _factory = {};
        
        Object.keys(factory).filter(f =>
            typeof factory[f] === "function"
        ).forEach(f =>
            _factory[f] = factory[f].bind(_this)
        );
        
        return _factory;
    };
};

ClassHelper.Bound = function (name, bound)
{
    const _bound = function (_this)
    {
        return bound.bind(_this);
    };
    
    _bound._bound = name;
    
    return _bound;
};

ClassHelper.version = () => require("../package.json").version;

module.exports = ClassHelper;

},{"../package.json":2}],2:[function(require,module,exports){
module.exports={
  "name": "class-helper",
  "version": "0.2.0",
  "description": "ClassHelper helps creating classes easily",
  "main": "lib/class-helper.js",
  "dependencies": {},
  "devDependencies": {
    "browserify": "^13.0.1"
  },
  "scripts": {
    "build": "browserify lib/class-helper.js -o build/class-helper.js --standalone ClassHelper"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/stefanwimmer128/class-helper.git"
  },
  "keywords": [
    "class-helper",
    "class"
  ],
  "author": "Stefan Wimmer <stefanwimmer128@gmail.com>",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/stefanwimmer128/class-helper/issues"
  },
  "homepage": "https://github.com/stefanwimmer128/class-helper#readme"
}

},{}]},{},[1])(1)
});