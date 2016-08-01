# spf-express
Express middleware for youtube's [SPF](http://youtube.github.io/spfjs/) framework. 

Framework documentation can be found [here](http://youtube.github.io/spfjs/documentation)

### Features
- Intercept requests with custom SPF query identifiers
- Attach SPF response objects or custom express handler to desired path

### Installation
```
npm install spf-express
```

To run tests:
```
npm test
```

### Usage
```javascript
spf_express(opts)   //returns an express middleware function
```
### Examples

Simple example 
```javascript
var spf_express = require("spf-express"),
    express = require("express"),
    app = express()

app.use(spf_express({
    paths: {
        "/sample_path": {
            title: "My website title",
            ...
        }   //SPF Response object
    }
}))
```

Advanced features
```javascript
app.use(spf_express({
    paths: {
        "/sample_path": function(req, res, next) { ... }    //custom express handler
    },
    identifiers: ["my_identifier"],     //array of identifier strings
    override: true  //will override default identifiers (default: ["navigate", "prefetch", "navigate-back"])
}))
```