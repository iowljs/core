(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var router_1 = require("./src/router/router");
/**
 * TEST CLASSES
 */
var test_1 = require("./test");
/**
 * Export OwlApp class
 */
var OwlApp = /** @class */ (function () {
    function OwlApp(appDetails) {
        this.router = new router_1.Router;
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
    OwlApp.prototype.setup = function () { };
    return OwlApp;
}());
exports.OwlApp = OwlApp;
/** Simple JSx Test */
var t = new test_1.test({});
document.body.appendChild(t.render());

},{"./src/router/router":3,"./test":4}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Router = /** @class */ (function () {
    function Router() {
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

},{}],4:[function(require,module,exports){
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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    test.prototype.setBla = function () {
        this.state.abloobla = 'Marissa';
    };
    test.prototype.render = function () {
        this.setBla();
        return (React_1.React.createElement("div", null,
            "Test! Hi ",
            this.state.abloobla,
            "!",
            React_1.React.createElement("br", null),
            React_1.React.createElement(TitleContent, { name: "Curtis Gervais" })));
    };
    return test;
}(React_1.ViewComponent));
exports.test = test;

},{"./src/class/React":2}]},{},[1]);
