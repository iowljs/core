//---- Import OwlApp ----\\
import { OwlApp } from './bootstrap'
//---- Import Components ----\\
import { test } from './views/test'

//---- Starter Kit ----\\
// In here we'll create a simple OwlApp
// We use the selector of 'body'
// We use the test.tsx class in the views folder
// We set debug mode to false
// We define a version number, this is optional
// We can replace this by adding views of your own
//---- BEGIN APPLICATION ----\\
new OwlApp({
    name: test, // direct component
    selector: 'body', // selector tag, ie 'body' or '#app'
    debugMode: false, // enable for simple output in logs
    version: '1.0.1-dev' // version code, optional
})
//---- END APPLICATION ----\\