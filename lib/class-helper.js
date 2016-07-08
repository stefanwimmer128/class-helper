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
