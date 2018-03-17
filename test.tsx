import { React, ViewComponent } from './src/class/React'

function TitleContent({ name = '' } = {}) {
    return (
        <span>hola {name}</span>
    )
} 

export class test extends ViewComponent {
    setBla() {
        this.state.abloobla = 'Smith, Bob';
    }
    render() {
        this.setBla()
        return (
                <div>
                    Test! A bloo bla is {this.state.abloobla}!
                    <br />
                    <button onClick={console.log('here')}>Click here</button>
                    <br />
                    <TitleContent name="Bob Smith" />
                </div>
            );
    }
}