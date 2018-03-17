import { EventWatcher } from '../class/EventWatcher'

export interface IStateStore {
    state: Array<IStateKVP>;
    EventWatcher: EventWatcher;
    getState(key: string): any;
    updateState(key: string, value: any): boolean;
    setState(key: string, value: any): boolean;
}

export interface IStateKVP {
    name: string;
    value: any;
}