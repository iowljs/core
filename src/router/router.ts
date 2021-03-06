import { IRouter } from '../interfaces/IRouter'
import { IRouteList } from '../interfaces/IRouteList'
import { EventWatcher } from '../class/EventWatcher'

export class Router implements IRouter {

    public routeList: IRouteList;
    public currentPath: string;
    public EventWatcher: EventWatcher;
    public coreSelector: any;

    constructor(EventWatcher: EventWatcher) {
        this.EventWatcher = EventWatcher;
    }

    public setCurrentPath(path: string) {
        this.currentPath = path;
    }

    /**
     * A simple list of routes
     * @param RouteList A list of routes
     */
    public setRoutes(RouteList: IRouteList): boolean {
        this.routeList = RouteList
        return true
    }

    public bindHashChanges() {
        document.addEventListener('hashchange', this.routeChangeEvent.bind(this))
    }

    /**
     * routeChangeEvent will trigger on hash change event on dom document
     */
    public routeChangeEvent(): boolean {
        let hash = window.location.hash
        if( this.currentPath === hash) {
            return false
        }
        this.currentPath = hash
        var parts = hash.split("/")
        var controller = parts[1]
        var method = parts[2]
        var data = parts.slice(3) // these act as key value pairs
        var routes = this.routeList.routes;
        var EventWatcher = this.EventWatcher
        routes.forEach(function (route) {
            var path = route.path
            if(path === controller) {
                EventWatcher.triggerEvent('router.routeChange', {
                    controller: controller,
                    method: method,
                    data: data
                })
                var closure = route.closure
                if (typeof closure.eventDidHappen === 'undefined') {
                    route.closure = new route.closure({
                        method: method,
                        data: data
                    })
                    closure = route.closure
                    closure.EventWatcher = this.EventWatcher
                    var html = closure.render() // "*classname*.render()"
                    this.coreSelector.innerHTML = ""
                    this.coreSelector.appendChild(html)
                    EventWatcher.triggerEvent('controller.didChange', {
                        controller: controller,
                        method: method,
                        data: data
                    })
                }
            }
        }.bind(controller, method, data, EventWatcher))
        return true
    }

}