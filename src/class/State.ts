import { IStateStore, IStateKVP } from '../interfaces/IStateStore'
import { EventWatcher } from './EventWatcher'

export class State implements IStateStore {
    public state: Array<IStateKVP>; // array of IStateKVP objects
    public EventWatcher: EventWatcher;

    /**
     * @param EventWatcher EventWatcher class, from Bootstrap
     */
    constructor(EventWatcher: EventWatcher) {
        this.EventWatcher = EventWatcher
    }

    /**
     * @param key Key to search from state
     */
    public getState(key: string): any {
        var state = this.state;
        var state_result = null;
        state.forEach(function (state_object) {
            if(state_object.name === key) {
                state_result = state_object.value;
            }
        }.bind(key, state_result))
        return state_result;
    }

    /**
     * @param key The key to update
     * @param value The new value to assign
     */
    public updateState(key: string, value: any): boolean {
        var state = this.state;
        state.forEach(function (state_object) {
            if(state_object.name === key) {
                state_object.value = value
            }
        })
        return false
    }

    /**
     * @param key The key to assign
     * @param value The value to assign for the key
     */
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