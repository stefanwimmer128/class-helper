# ClassHelper

ClassHelper helps creating classes easily

## How to use

ClassHelper can be used either as node module or bower component.

### Using npm

``` bash
npm i -S class-helper
```

``` javascript
const ClassHelper = require("class-helper");
```

### Using bower

``` bash
bower i -S class-helper
```

``` html
<script src="bower_components/class-helper/build/class-helper.js"></script>
```

### Start coding

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
