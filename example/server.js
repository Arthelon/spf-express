var express = require("express")
var app = express()
var http = require("http")
var path = require("path")
var server = http.createServer(app)
var spfExpress = require("../index")

app.use(express.static(__dirname))
app.use(spfExpress({
    paths: {
        "/main": {
            title: "another page!",
            url: "/",
            head: "<link rel='stylesheet' type='text/css' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>",
            body: {
                "target": "Hey! I look pretty good now!",
            },
            attr: {
                container: {
                    class: "container text-center"
                },
                button: {
                    class: "btn btn-primary"
                }
            },
            foot: "<script src=\"https://code.jquery.com/jquery-2.2.4.min.js\"></script>"+ //JS Scripts
            "<script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\"></script>"
        }
    }
}))
app.get("/", function(req, res) {
    res.render("index.html")
})

server.listen(3000, function(err) {
    if (err)
        console.log(err)
    else
        console.log("Server listening on port: 3000")
})
