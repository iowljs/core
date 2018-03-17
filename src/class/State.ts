import { IStateStore, IStateKVP } from '../interfaces/IStateStore'
import { EventWatcher } from './EventWatcher'

export class State implements IStateStore {
    private state: Array<IStateKVP>; // array of IStateKVP objects
    private EventWatcher: EventWatcher;

    constructor(EventWatcher: EventWatcher) {
        this.EventWatcher = EventWatcher
    }

    public updateState(key: string, value: any): boolean {
        var state = this.state;
        state.forEach(function (state_object) {
            if(state_object.name === key) {
                state_object.value = value
            }
        })
        return false
    }

    public setState(key: string, value: any): boolean {
        if ( !this.updateState(key, value) ) {
            this.state.push({
                name: key,
                value: value
            })
        }
        return true
    }
}