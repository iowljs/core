import { React, ViewComponent } from '../src/class/React'
import { render } from '../src/globals/render'
import { DOMNode } from '../src/models/DOMNode'

function TitleContent({ name = '' } = {}) {
    return (
        <span>hola {name}</span>
    )
} 

export class test extends ViewComponent {
    public hasDonePreinit: boolean = false;
    public el: any;
	
    constructor(props) {
    	super(props);
        this.doTest = this.doTest.bind(this)
    }
    setBla() {
        this.state.abloobla = 'Smith, Bob';
    }

    setBlaMessage(message?: string) {
        this.state.blamessage = message || 'Click here'
    }
    
    preinit() {
        if ( this.hasDonePreinit ) return
        this.setBla()
        this.setBlaMessage()
        this.hasDonePreinit = true
    }

    makeId() {
        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          
            for (var i = 0; i < 15; i++)
              text += possible.charAt(Math.floor(Math.random() * possible.length));
          
            return text;
        }
        return makeid()
    }

    onUpdate(state) {}

    doTest(e) {
        var target = new DOMNode(e.target)
        //target.innerHTML = 'test'
        this.setState(state => ({ blamessage: this.makeId() }))
        target.changeHTML(this.state.blamessage)
    }

    render() {
        this.preinit()
        this.el = (
                <div data-root>
                    Test! A bloo bla is {this.state.abloobla}!
                    <br />
                    <button onClick={this.doTest}>{this.state.blamessage}</button>
                    <br />
                    <TitleContent name="Bob Smith" />
                </div>
            );
	    return this.el
    }
}
