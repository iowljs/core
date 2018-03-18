export interface IDOMNode {
    node: any;
    changeText(newText: string): boolean;
    changeHTML(newText: string): boolean;
    addClass(className: string): boolean;
    hide(show: boolean): boolean;
}