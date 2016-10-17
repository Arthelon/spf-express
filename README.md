
# spf-express [![npm](https://img.shields.io/badge/npm-v0.1.1-blue.svg)](https://www.npmjs.com/package/spf-express)
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

### API
```javascript
spf_express(opts)   //returns an express middleware function
```

#### Options:
- paths: Object
    - [path: String]: Object | Function
    - Key value can either be a SPF response object or an express middleware function
    - Will return the corresponding response object or forward request to middleware when a SPF request is sent to a defined path.
- identifiers: [String]
    - default: ["navigate", "prefetch", "navigate-back"]
    - Extends on the default valid SPF request identifiers on the "spf" query field
        - if the "spf" query field in a request contains a value in this field, it will be treated as a valid SPF request.
- override: Boolean
    - default: False
    - will override default list of SPF request identifiers with those set in the "identifiers" field if set to True.

### Examples

#### Simple example
```javascript
var spf_express = require("spf-express"),
    express = require("express"),
    app = express()

app.use(spf_express({
    paths: {
        "/sample_path": {
            title: "My website title",
            body: "<h1>Hello World!</h1>"
        } //SPF response object
    }
}))
```
More on SPF response objects [here](http://youtube.github.io/spfjs/documentation/responses/)

#### Advanced example
```javascript
app.use(spf_express({
    paths: {
        "/sample_path": function(req, res, next) { //express middleware function
            res.json({
                title: "My website title",
                body: "<h1>Hello World!</h1>"
            })
        }   
    },
    identifiers: ["my_identifier"],
    override: true   //"my_identifier" is now the only valid SPF request identifier!
}))
```

#### Example project
```
$ git clone https://github.com/Arthelon/spf-express.git
$ cd spf-express
$ npm install --dev
$ npm run start-example
```
