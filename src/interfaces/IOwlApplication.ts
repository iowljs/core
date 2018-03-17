import { IRouteList } from './IRouteList';

export interface IAppDetails {
    name: any;
    selector: string;
    debugMode: boolean;
    version?: string;
}

export interface IOwlApplication {
    appDetails: IAppDetails;
    create(appDetails: IAppDetails): boolean;
    setRoutes(routeList: IRouteList): boolean;
}