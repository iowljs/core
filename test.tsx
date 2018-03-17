import { React, ViewComponent } from './src/class/React'
import { render } from './src/globals/render'

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

    onUpdate(state) {}

    doTest(e) {
        var target = e.target
        //target.innerHTML = 'test'
	    this.setState(state => ({ blamessage: 'test' }))
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
