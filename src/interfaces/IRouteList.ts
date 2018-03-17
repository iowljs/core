export interface IRouteArray {
    path: string; // this is really a "controller"
    closure: any;
}

export interface IRouteList {
    routes: Array<IRouteArray>;
    monitor?: boolean;
    closure?: any;
}