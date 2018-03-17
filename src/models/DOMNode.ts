import { IDOMNode } from '../interfaces/IDOMNode'

export class DOMNode implements IDOMNode
{
    /**
     * @var node Node
     */
    public node: any;

    /**
     * @var selfHasNode void
     */
    public selfHasNode(): boolean {
        return typeof this.node !== 'undefined'
    }

    /**
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

    public changeHTML(newHTML: string): boolean {
        if ( this.selfHasNode() )
        {
            this.node.innerHTML = newHTML
            return true
        }
        return false
    }
}