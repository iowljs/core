(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var router_1 = require("./src/router/router");
var State_1 = require("./src/class/State");
/**
 * TEST CLASSES
 */
var test_1 = require("./test");
var EventWatcher_1 = require("./src/class/EventWatcher");
/**
 * Export OwlApp class
 */
var OwlApp = /** @class */ (function () {
    function OwlApp(appDetails) {
        this.EventWatcher = new EventWatcher_1.EventWatcher();
        this.state = new State_1.State(this.EventWatcher);
        this.router = new router_1.Router(this.EventWatcher);
        this.create(appDetails);
        this.setup();
    }
    /**
     * Create an application
     * @param appDetails Application Details
     */
    OwlApp.prototype.create = function (appDetails) {
        this.appDetails = appDetails;
        return true;
    };
    /**
     * setRoutes
     */
    OwlApp.prototype.setRoutes = function (routeList) {
        this.router.setRoutes(routeList);
        return true;
    };
    /**
     * Setup the actual application now, trigger default render
     */
    OwlApp.prototype.setup = function () {
        if (this.appDetails.debugMode) {
            console.log("/----------------\\");
            console.log("/---- Owl.js ----\\");
            console.log("/----------------\\");
            console.log("Version " + (this.appDetails.version || '1'));
        }
        this.render();
    };
    OwlApp.prototype.render = function () {
        var selector = this.appDetails.selector;
        var appcls = this.appDetails.name;
        var app = new appcls({});
        document.querySelector(selector)
            .appendChild(app.render());
    };
    return OwlApp;
}());
exports.OwlApp = OwlApp;
var testapp = new OwlApp({
    name: test_1.test,
    selector: 'body',
    debugMode: false,
    version: '1.0.1-dev'
});

},{"./src/class/EventWatcher":2,"./src/class/State":4,"./src/router/router":5,"./test":6}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var EventWatcher = /** @class */ (function () {
    function EventWatcher() {
        this.events = [];
    }
    /**
     * triggerEvent will trigger an event
     * @param name The event name, matches the "trigger" column in IEvent (Array<IEvent>)
     * @param details The details to supply to the closure
     */
    EventWatcher.prototype.triggerEvent = function (name, details) {
        var event_did_fire_at_least_once = false;
        var events = this.events;
        var self = this;
        events.forEach(function (event) {
            if (event.trigger === name) {
                event.closure(name, details);
                event_did_fire_at_least_once = true;
            }
        }.bind(self, event_did_fire_at_least_once, name, details));
        return event_did_fire_at_least_once;
    };
    /**
     * addEventTrigger will push an event trigger onto the events stack
     * @param trigger The event trigger string, ie router.routeChange
     * @param closure The class handler to trigger when this event fires
     */
    EventWatcher.prototype.addEventTrigger = function (trigger, closure) {
        this.events.push({
            trigger: trigger,
            closure: closure
        });
        return true;
    };
    return EventWatcher;
}());
exports.EventWatcher = EventWatcher;

},{}],3:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
function ObjectEntries(obj) {
    var ownProps = Object.keys(obj), i = ownProps.length, resArray = new Array(i);
    while (i--)
        resArray[i] = [ownProps[i], obj[ownProps[i]]];
    return resArray;
}
var ViewComponent = /** @class */ (function () {
    function ViewComponent(props) {
        this.state = this.mergeInitialState(props, {});
    }
    ViewComponent.prototype.onEvent = function (event, details) { };
    ViewComponent.prototype.eventDidHappen = function (event, details) {
        if (typeof this.onEvent !== 'undefined') {
            this.onEvent(event, details);
        }
    };
    ViewComponent.prototype.mergeInitialState = function (props, state) {
        if (typeof props === 'undefined')
            return this.getInitialState();
        // merge two object sets    
        var finalState = {};
        Object.keys(props).forEach(function (key, value) {
            finalState[key] = value;
        });
        Object.keys(state).forEach(function (key, value) {
            finalState[key] = value;
        });
        return finalState;
    };
    ViewComponent.prototype.getInitialState = function () {
        return {};
    };
    ViewComponent.prototype.setState = function (handler) {
        if (typeof handler !== 'function') {
            this.state = __assign({}, this.state, handler);
            return this.state;
        }
        this.state = handler(this.state);
        return this.state;
    };
    ViewComponent.prototype.rerender = function (target) {
        var node = target;
        var innerHTML = node.innerHTML;
        console.log(innerHTML);
    };
    ViewComponent.prototype.render = function () {
        throw new ReferenceError("You must define your own render functions");
    };
    ViewComponent.isClass = true;
    return ViewComponent;
}());
exports.ViewComponent = ViewComponent;
var React = /** @class */ (function () {
    function React() {
    }
    React.stringStartsWith = function (search, pos) {
        return search.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    };
    React.isEvent = function (attr) {
        return (React.stringStartsWith(attr, 'on') && attr[2].toLowerCase() !== attr[2]);
    };
    React.getEventName = function (attr) {
        return attr.split('').splice(2).join('').toLowerCase();
    };
    React.createElement = function (type, _props) {
        var _children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            _children[_i - 2] = arguments[_i];
        }
        var props = _props || {};
        var children = Array.isArray(_children[0]) ? _children[0] : _children;
        if (typeof type === 'function') {
            var componentProps = __assign({}, props, { children: (props.children || []).concat(children) });
            if (type.isClass) {
                var component = new type(componentProps);
                var element_1 = component.render(componentProps);
                return element_1;
            }
            var element_2 = type(componentProps);
            return element_2;
        }
        var element = document.createElement(type);
        ObjectEntries(props).forEach(function (_a) {
            var name = _a[0], value = _a[1];
            if (name === 'children') {
                return value
                    .map(function (child) { return typeof child === 'string' ? document.createTextNode(child) : child; })
                    .forEach(function (child) { return element.appendChild(child); });
            }
            if (!React.isEvent(name)) {
                return element.setAttribute(name, value);
            }
            var eventName = React.getEventName(name);
            element.addEventListener(eventName, value);
        });
        children
            .map(function (child) { return typeof child === 'string' ? document.createTextNode(child) : child; })
            .forEach(function (child) { return element.appendChild(child); });
        return element;
    };
    return React;
}());
exports.React = React;

},{}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var State = /** @class */ (function () {
    /**
     * @param EventWatcher EventWatcher class, from Bootstrap
     */
    function State(EventWatcher) {
        this.EventWatcher = EventWatcher;
    }
    /**
     * @param key Key to search from state
     */
    State.prototype.getState = function (key) {
        var state = this.state;
        var state_result = null;
        state.forEach(function (state_object) {
            if (state_object.name === key) {
                state_result = state_object.value;
            }
        }.bind(key, state_result));
        return state_result;
    };
    /**
     * @param key The key to update
     * @param value The new value to assign
     */
    State.prototype.updateState = function (key, value) {
        var state = this.state;
        state.forEach(function (state_object) {
            if (state_object.name === key) {
                state_object.value = value;
            }
        });
        return false;
    };
    /**
     * @param key The key to assign
     * @param value The value to assign for the key
     */
    State.prototype.setState = function (key, value) {
        if (!this.updateState(key, value)) {
            this.state.push({
                name: key,
                value: value
            });
        }
        return true;
    };
    return State;
}());
exports.State = State;

},{}],5:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Router = /** @class */ (function () {
    function Router(EventWatcher) {
        this.EventWatcher = EventWatcher;
    }
    Router.prototype.setCurrentPath = function (path) {
        this.currentPath = path;
    };
    /**
     * A simple list of routes
     * @param RouteList A list of routes
     */
    Router.prototype.setRoutes = function (RouteList) {
        this.routeList = RouteList;
        return true;
    };
    /**
     * routeChangeEvent will trigger on hash change event on dom document
     */
    Router.prototype.routeChangeEvent = function () {
        var hash = window.location.hash;
        if (this.currentPath === hash) {
            return false;
        }
        this.currentPath = hash;
        var parts = hash.split("/");
        var controller = parts[1];
        var method = parts[2];
        var data = parts.slice(3); // these act as key value pairs
        var routes = this.routeList.routes;
        var EventWatcher = this.EventWatcher;
        routes.forEach(function (route) {
            var path = route.path;
            if (path === controller) {
                route.closure(method, data);
                EventWatcher.triggerEvent('router.routeChange', {
                    controller: controller,
                    method: method,
                    data: data
                });
            }
        }.bind(controller, method, data, EventWatcher));
        return true;
    };
    return Router;
}());
exports.Router = Router;

},{}],6:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React_1 = require("./src/class/React");
function TitleContent(_a) {
    var _b = (_a === void 0 ? {} : _a).name, name = _b === void 0 ? '' : _b;
    return (React_1.React.createElement("span", null,
        "hola ",
        name));
}
var test = /** @class */ (function (_super) {
    __extends(test, _super);
    function test() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hasDonePreinit = false;
        return _this;
    }
    test.prototype.setBla = function () {
        this.state.abloobla = 'Smith, Bob';
    };
    test.prototype.setBlaMessage = function (message) {
        this.state.blamessage = message || 'Click here';
    };
    test.prototype.preinit = function () {
        if (this.hasDonePreinit)
            return;
        this.setBla();
        this.setBlaMessage();
        this.hasDonePreinit = true;
    };
    test.prototype.doTest = function (e) {
        var target = e.target;
        target.innerHTML = 'test';
    };
    test.prototype.render = function () {
        this.preinit();
        return (React_1.React.createElement("div", { "data-root": true },
            "Test! A bloo bla is ",
            this.state.abloobla,
            "!",
            React_1.React.createElement("br", null),
            React_1.React.createElement("button", { onClick: this.doTest }, this.state.blamessage),
            React_1.React.createElement("br", null),
            React_1.React.createElement(TitleContent, { name: "Bob Smith" })));
    };
    return test;
}(React_1.ViewComponent));
exports.test = test;

},{"./src/class/React":3}]},{},[1]);
