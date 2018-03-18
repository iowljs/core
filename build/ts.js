(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var router_1 = require("./src/router/router");
var State_1 = require("./src/class/State");
/**
 * TEST CLASSES
 */
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
        this.router.bindHashChanges();
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

},{"./src/class/EventWatcher":3,"./src/class/State":5,"./src/router/router":7}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
//---- Import OwlApp ----\\
var bootstrap_1 = require("./bootstrap");
//---- Import Components ----\\
var test_1 = require("./views/test");
//---- Starter Kit ----\\
// In here we'll create a simple OwlApp
// We use the selector of 'body'
// We use the test.tsx class in the views folder
// We set debug mode to false
// We define a version number, this is optional
// We can replace this by adding views of your own
//---- BEGIN APPLICATION ----\\
new bootstrap_1.OwlApp({
    name: test_1.test,
    selector: 'body',
    debugMode: false,
    version: '1.0.1-dev' // version code, optional
});
//---- END APPLICATION ----\\

},{"./bootstrap":1,"./views/test":8}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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
        this.onUpdate = this.onUpdate.bind(this);
        this.onEvent = this.onEvent.bind(this);
        this.eventDidHappen = this.eventDidHappen.bind(this);
    }
    ViewComponent.prototype.onEvent = function (event, details) { };
    ViewComponent.prototype.onUpdate = function (state) { };
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
            if (typeof this.onUpdate !== 'undefined') {
                this.onUpdate(this.state);
            }
            return this.state;
        }
        this.state = handler(this.state);
        if (typeof this.onUpdate !== 'undefined') {
            this.onUpdate(this.state);
        }
        return this.state;
    };
    ViewComponent.prototype.prerender = function () {
        this.EventWatcher.addEventTrigger('controller.didChange', this.onEvent.bind(this));
        this.EventWatcher.addEventTrigger('router.routeChange', this.onEvent.bind(this));
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var DOMNode = /** @class */ (function () {
    function DOMNode(node) {
        this.node = node;
    }
    /**
     * @var selfHasNode void
     */
    DOMNode.prototype.selfHasNode = function () {
        return typeof this.node !== 'undefined';
    };
    /**
     * Change the text content of a selector node
     * @var changeText void
     * @param newText The new text to assign to the node
     */
    DOMNode.prototype.changeText = function (newText) {
        if (this.selfHasNode()) {
            this.node.innerText = newText;
            return true;
        }
        return false;
    };
    /**
     * Change the HTML content
     * @param newHTML The HTML content to replace the existing with
     */
    DOMNode.prototype.changeHTML = function (newHTML) {
        if (this.selfHasNode()) {
            this.node.innerHTML = newHTML;
            return true;
        }
        return false;
    };
    /**
     * This accepts a className as a string, returns boolean
     * @param className The class name to add to the selector
     */
    DOMNode.prototype.addClass = function (className) {
        if (this.selfHasNode()) {
            this.node.classList.add(className);
            return true;
        }
        return false;
    };
    /**
     * Hide accepts an optional parameter, called show, defaults to false (hide)
     * @param show Should we show this selector?
     */
    DOMNode.prototype.hide = function (show) {
        if (show === void 0) { show = false; }
        if (show && this.selfHasNode()) {
            this.node.classList.remove('owl-hide');
            return true;
        }
        else if (!show && this.selfHasNode()) {
            this.node.classList.add('owl-hide');
            return false;
        }
        return false;
    };
    return DOMNode;
}());
exports.DOMNode = DOMNode;

},{}],7:[function(require,module,exports){
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
    Router.prototype.bindHashChanges = function () {
        document.addEventListener('hashchange', this.routeChangeEvent.bind(this));
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
                EventWatcher.triggerEvent('router.routeChange', {
                    controller: controller,
                    method: method,
                    data: data
                });
                var closure = route.closure;
                if (typeof closure.eventDidHappen === 'undefined') {
                    route.closure = new route.closure({
                        method: method,
                        data: data
                    });
                    closure = route.closure;
                    closure.EventWatcher = this.EventWatcher;
                    var html = closure.render(); // "*classname*.render()"
                    this.coreSelector.innerHTML = "";
                    this.coreSelector.appendChild(html);
                    EventWatcher.triggerEvent('controller.didChange', {
                        controller: controller,
                        method: method,
                        data: data
                    });
                }
            }
        }.bind(controller, method, data, EventWatcher));
        return true;
    };
    return Router;
}());
exports.Router = Router;

},{}],8:[function(require,module,exports){
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
var React_1 = require("../src/class/React");
var DOMNode_1 = require("../src/models/DOMNode");
function TitleContent(_a) {
    var _b = (_a === void 0 ? {} : _a).name, name = _b === void 0 ? '' : _b;
    return (React_1.React.createElement("span", null,
        "hola ",
        name));
}
var test = /** @class */ (function (_super) {
    __extends(test, _super);
    function test(props) {
        var _this = _super.call(this, props) || this;
        _this.hasDonePreinit = false;
        _this.doTest = _this.doTest.bind(_this);
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
    test.prototype.makeId = function () {
        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < 15; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        }
        return makeid();
    };
    test.prototype.onUpdate = function (state) { };
    test.prototype.doTest = function (e) {
        var _this = this;
        var target = new DOMNode_1.DOMNode(e.target);
        //target.innerHTML = 'test'
        this.setState(function (state) { return ({ blamessage: _this.makeId() }); });
        target.changeHTML(this.state.blamessage);
    };
    test.prototype.render = function () {
        this.preinit();
        this.el = (React_1.React.createElement("div", { "data-root": true },
            "Test! A bloo bla is ",
            this.state.abloobla,
            "!",
            React_1.React.createElement("br", null),
            React_1.React.createElement("button", { onClick: this.doTest }, this.state.blamessage),
            React_1.React.createElement("br", null),
            React_1.React.createElement(TitleContent, { name: "Bob Smith" })));
        return this.el;
    };
    return test;
}(React_1.ViewComponent));
exports.test = test;

},{"../src/class/React":4,"../src/models/DOMNode":6}]},{},[2]);
