/**
 * Import DOMNode, Route/Router Libraries, Database Libraries
 */
import { DOMNode } from './src/models/DOMNode'
import { Router } from './src/router/router'
import { State } from './src/class/State'
import { render } from './src/globals/render'

/**
 * Import Interfaces
 */
import { IOwlApplication, IAppDetails } from './src/interfaces/IOwlApplication'
import { IRouteList } from './src/interfaces/IRouteList'
import { IRenderEngine } from './src/interfaces/IRenderEngine'

/**
 * TEST CLASSES
 */
import { EventWatcher } from './src/class/EventWatcher';

/**
 * Export OwlApp class
 */
export class OwlApp implements IOwlApplication {
    public appDetails: IAppDetails;
    public router: Router;
    public state: State;
    public EventWatcher: EventWatcher;

    constructor(appDetails: IAppDetails) {
        this.EventWatcher = new EventWatcher();
        this.state = new State(this.EventWatcher)
        this.router = new Router(this.EventWatcher);
        this.create(appDetails)
        this.setup()
        this.router.bindHashChanges()
    }
    
    /**
     * Create an application
     * @param appDetails Application Details
     */
    public create(appDetails: IAppDetails): boolean {
        this.appDetails = appDetails
        return true
    }

    /**
     * setRoutes
     */
    public setRoutes(routeList: IRouteList): boolean {
        this.router.setRoutes(routeList)
        return true
    }

    /**
     * Setup the actual application now, trigger default render
     */
    public setup() {
        if(this.appDetails.debugMode) {
            console.log(`/----------------\\`)
            console.log(`/---- Owl.js ----\\`)
            console.log(`/----------------\\`)
            console.log(`Version ${this.appDetails.version || '1'}`)
        }
        this.render()
    }

    public render() {
        var selector = this.appDetails.selector;
        let appcls = this.appDetails.name;
        let app = new appcls({});
        document.querySelector(selector)
            .appendChild(
                app.render()
            )
    }
}

import { test } from './test'
new OwlApp({
    name: test, // direct component
    selector: 'body', // selector tag, ie 'body' or '#app'
    debugMode: false, // enable for simple output in logs
    version: '1.0.1-dev' // version code, optional
})