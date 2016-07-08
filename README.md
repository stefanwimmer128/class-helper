# ClassHelper

ClassHelper helps creating classes easily

## How to use

ClassHelper can be used either as node module or bower component.

### Use as node module

``` bash
npm i -S class-helper
```

### Use as bower component

``` bash
bower i -S class-helper
```

### How to make classes

ClassHelper must be either required (node module) or is available globally (bower component).

``` javascript
const Logger = ClassHelper.Factory({
    log: function (...message)
    {
        console.log(...message);
    }
});

const Greet = ClassHelper.Bound("greet", function ()
{
    this.log("Hello " + this.getName());
});

const Person = ClassHelper({
    constructor: function (_super, name)
    {
        this.name = name;
    },
    
    getName: function ()
    {
        return this.name;
    }
}, [ Logger ], [ Greet ]);

const Me = ClassHelper({
    constructor: function (_super)
    {
        _super("stefanwimmer128");
    }
}, Person);

new Me().greet(); // Hello stefanwimmer128
```
