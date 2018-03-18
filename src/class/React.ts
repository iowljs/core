import { IRenderEngine } from '../interfaces/IRenderEngine'
import { IViewComponent } from '../interfaces/IViewComponent'
import { EventWatcher } from './EventWatcher'

function ObjectEntries(obj) {
    var ownProps = Object.keys( obj ),
        i = ownProps.length,
        resArray = new Array(i);
    while (i--)
        resArray[i] = [ownProps[i], obj[ownProps[i]]]
    
    return resArray
}

export class ViewComponent implements IViewComponent {
    public state: any;
    public static isClass: boolean = true;
    public EventWatcher: EventWatcher;
    public selector: any;
    public el: any;
    
    constructor(props) {
        this.state = this.mergeInitialState(props, {});
        this.onUpdate = this.onUpdate.bind(this)
        this.onEvent = this.onEvent.bind(this)
        this.eventDidHappen = this.eventDidHappen.bind(this)
    }

    onEvent(event: string, details: any) {}
    onUpdate(state: any): any {}

    replaceOnSelector() {
        if(typeof this.selector !== 'undefined') {
            this.el = this.render()
            this.selector.appendChild(this.el)
        }
    }

    eventDidHappen(event: string, details: any) {
        if( typeof this.onEvent !== 'undefined' ) {
            this.onEvent(event, details)
        }
    }

    public mergeInitialState(props, state): object {
        if(typeof props === 'undefined') return this.getInitialState();
        // merge two object sets    
        let finalState = {};
        Object.keys(props).forEach((key, value) => {
            finalState[key] = value
        })
        Object.keys(state).forEach((key, value) => {
            finalState[key] = value
        })
        return finalState
    }

    public getInitialState() {
        return {};
    }

    public setState(handler: any) {
        if(typeof handler !== 'function') {
            this.state = { ...this.state, ...handler }
            if(typeof this.onUpdate !== 'undefined') {
                this.onUpdate(this.state)
            }
            return this.state;
        }
        this.state = handler(this.state);
        if(typeof this.onUpdate !== 'undefined') {
            this.onUpdate(this.state)
        }
        return this.state;
    }

    public prerender() {
        this.EventWatcher.addEventTrigger(
            'controller.didChange',
            this.onEvent.bind(this)
        )
        this.EventWatcher.addEventTrigger(
            'router.routeChange',
            this.onEvent.bind(this)
        )
    }

    public render() {
        throw new ReferenceError(`You must define your own render functions`);
    }

}

export class React implements IRenderEngine { // our fake React class
    static stringStartsWith(search: string, pos: any): boolean {
        return search.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    }
    static isEvent(attr: string): boolean {
        return (React.stringStartsWith(attr, 'on') && attr[2].toLowerCase() !== attr[2])
    }
    static getEventName(attr: string): string {
        return attr.split('').splice(2).join('').toLowerCase()
    }
    static createElement(type: any, _props, ..._children) {
        const props = _props || {};
        const children = Array.isArray(_children[0]) ? _children[0] : _children;
        if (typeof type === 'function') {
            const componentProps = { ...props, children: ( props.children || [] ).concat(children) }
            if(type.isClass) {
                const component = new type(componentProps)
                const element = component.render(componentProps);
                return element;
            }
            const element = type(componentProps);
            return element
        }
        const element = document.createElement(type)
        ObjectEntries(props).forEach(([name, value]) => {
            if (name === 'children') {
                return value
                        .map(child => typeof child === 'string' ? document.createTextNode(child) : child)
                        .forEach(child => element.appendChild(child))
            }
            if ( !React.isEvent(name) ) {
                return element.setAttribute(name, value)
            }
            const eventName = React.getEventName(name);
            element.addEventListener(eventName, value);
        })

        children
            .map(child => typeof child === 'string' ? document.createTextNode(child) : child)
            .forEach(child => element.appendChild(child));

        return element;
    }
    getSelf() {
        return React;
    }
}
