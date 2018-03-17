import { React, ViewComponent } from './src/class/React'

function TitleContent({ name = '' } = {}) {
    return (
        <span>hola {name}</span>
    )
} 

export class test extends ViewComponent {
    public hasDonePreinit: boolean = false;

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

    doTest(e) {
        var target = e.target
        target.innerHTML = this.state.blamessage
    }

    render() {
        this.preinit()
        return (
                <div data-root>
                    Test! A bloo bla is {this.state.abloobla}!
                    <br />
                    <button onClick={this.doTest}>{this.state.blamessage}</button>
                    <br />
                    <TitleContent name="Bob Smith" />
                </div>
            );
    }
}