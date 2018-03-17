/**
 * Import DOMNode, Route/Router Libraries, Database Libraries
 */
import { DOMNode } from './src/models/DOMNode'
import { Router } from './src/router/router'

/**
 * Import Interfaces
 */
import { IOwlApplication, IAppDetails } from './src/interfaces/IOwlApplication'
import { IRouteList } from './src/interfaces/IRouteList'
import { IRenderEngine } from './src/interfaces/IRenderEngine'

/**
 * TEST CLASSES
 */
import { test } from './test'

/**
 * Export OwlApp class
 */
export class OwlApp implements IOwlApplication {
    appDetails: IAppDetails;
    router: Router;

    constructor(appDetails: IAppDetails) {
        this.router = new Router;
        this.create(appDetails)
        this.setup()
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