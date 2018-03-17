# Owl.js

## Owl Core Implmentation

This is the Owl.js core implementation in Typescript, here we export the class. This is the simplest implementation of a basic router, views, and controllers (or, models).

**This is a work in progress, so some things like Events may not be fully hooked up**

## File Extensions

You can use .tsx for views/controllers, so this will enable the JSX transformations available. We use an identical API to React's JSX implementation, so it's super simple and easy to convert to Owl, please see ```test.tsx```

## Sample File

Clone this repository, in your index.ts file, import components, here's a simple component:

```jsx
import { React, ViewComponent } from './src/class/React' // named "React" so we don't need babel, and can use typescript natively right now

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
        target.innerHTML = 'test'
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
```

In your index.ts do this:

```typescript
import { OwlApp } from './bootstrap'
import { ComponentName } from './ComponentName'
new OwlApp({
    name: ComponentName, // direct component
    selector: 'body', // selector tag, ie 'body' or '#app'
    debugMode: false, // enable for simple output in logs
    version: '1.0.1-dev' // version code, optional
})
```