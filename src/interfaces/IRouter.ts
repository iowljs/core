import { IRouteList } from './IRouteList'
import { EventWatcher } from '../class/EventWatcher'

export interface IRouter {
    routeList: IRouteList;
    currentPath: string;
    EventWatcher: EventWatcher;
    setRoutes(RouteList: IRouteList): boolean;
    setCurrentPath(path: string);
    routeChangeEvent(): boolean;
}