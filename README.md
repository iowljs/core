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

## Building

Right now, we're using a flat gulp file to build, here's the jist on how to compile the source tree down:

```javascript
gulp.task('compile', () => {
    return browserify({
        basedir: '.',
        debug: false,
        entries: ['index.ts'], // change this to "bootstrap.ts" for packaging the core, not the example library included
        cache: {},
        packageCache: {}
    })
    .plugin(tsify, {
       target: "es3",
       noImplicitAny: false,
       surpressImplicityAnyIndexErrors: false,
       jsx: "react" // our custom react-compatible engine is included in the source tree
    })
    .bundle() // create bundle
    .pipe(source('ts.js')) // pipe it as ts.js
    .pipe(gulp.dest('build')) // pipe to build directory, as build/ts.js
})
```

Then run:

```gulp compile``` and you're off to the races. Note, all view files must be using the tsx extension.