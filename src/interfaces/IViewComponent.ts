export interface IViewComponent {
    state: any;
    selector: any;
    el: any;
    onEvent(event: string, details: any);
    replaceOnSelector();
    eventDidHappen(event: string, details: any);
    mergeInitialState(props, state): object;
    getInitialState();
    setState(handler: any);
    prerender();
    render();
}