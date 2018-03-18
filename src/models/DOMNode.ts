import { IDOMNode } from '../interfaces/IDOMNode'

export class DOMNode implements IDOMNode
{
    /**
     * @var node Node
     */
    public node: any;

    constructor(node: any) {
        this.node = node
    }

    /**
     * @var selfHasNode void
     */
    public selfHasNode(): boolean {
        return typeof this.node !== 'undefined'
    }

    /**
     * Change the text content of a selector node
     * @var changeText void
     * @param newText The new text to assign to the node
     */
    public changeText(newText: string): boolean {
        if( this.selfHasNode() )
        {
            this.node.innerText = newText
            return true
        }
        return false
    }

    /**
     * Change the HTML content
     * @param newHTML The HTML content to replace the existing with
     */
    public changeHTML(newHTML: string): boolean {
        if ( this.selfHasNode() )
        {
            this.node.innerHTML = newHTML
            return true
        }
        return false
    }

    /**
     * This accepts a className as a string, returns boolean
     * @param className The class name to add to the selector
     */
    public addClass(className: string): boolean {
        if ( this.selfHasNode() )
        {
            this.node.classList.add( className )
            return true
        }
        return false
    }

    /**
     * Hide accepts an optional parameter, called show, defaults to false (hide)
     * @param show Should we show this selector?
     */
    public hide(show: boolean = false): boolean {
        if(show && this.selfHasNode() ) {
            this.node.classList.remove('owl-hide')
            return true
        }
        else if ( !show && this.selfHasNode() ) {
            this.node.classList.add('owl-hide')
            return false
        }
        return false
    }
}