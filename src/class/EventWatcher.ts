import { IEvent, IEventWatcher } from '../interfaces/IEventWatcher'

export class EventWatcher implements IEventWatcher {
    public events: Array<IEvent>;

    constructor() {
        this.events = []
    }
    
    /**
     * triggerEvent will trigger an event
     * @param name The event name, matches the "trigger" column in IEvent (Array<IEvent>)
     * @param details The details to supply to the closure
     */
    public triggerEvent(name: string, details: any): boolean {
        var event_did_fire_at_least_once = false
        var events = this.events
        var self = this
        events.forEach(function (event) {
            if(event.trigger === name) {
                event.closure(
                    name,
                    details
                )
                event_did_fire_at_least_once = true
            }
        }.bind(self, event_did_fire_at_least_once, name, details))
        return event_did_fire_at_least_once
    }

    /**
     * addEventTrigger will push an event trigger onto the events stack
     * @param trigger The event trigger string, ie router.routeChange
     * @param closure The class handler to trigger when this event fires
     */
    public addEventTrigger(trigger: string, closure: any): boolean {
        this.events.push({
            trigger: trigger,
            closure: closure
        })
        return true
    }
}