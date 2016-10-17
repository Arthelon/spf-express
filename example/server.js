const express = require("express");
const spfExpress = require("../index");
const ejs = require("ejs");
const http = require("http");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.set('port', port);
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use('/static', express.static(`${__dirname}/dist`));
app.use(express.static(__dirname));
app.use(spfExpress({
    paths: {
        "/main": {
            title: "another page!",
            url: "/main",
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
}));

app.get("/", function(req, res) {
    res.render("layouts/index")
});
app.get("/main", function(req, res) {
    res.render("layouts/index")
});

let server = app.listen(app.get('port'), () => console.log(`[express] server started on port ${app.get('port')}.`));
