export interface IEvent {
    trigger: string; // what to trigger this event on, ie: router.routeChange
    closure: any; // the class to trigger
}

export interface IEventWatcher {
    events: Array<IEvent>;
    triggerEvent(name: string, details: any): boolean;
    addEventTrigger(trigger: string, closure: any): boolean;
}