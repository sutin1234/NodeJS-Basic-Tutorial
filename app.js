var express = require("express");
var ejs = require("ejs");
var path = require("path");
var database = require("./views/modules/database");
var body_parser = require("body-parser");
var mysql = require("mysql");
var multer = require("multer");



var urlencodeBodyParse = body_parser.urlencoded({ extended: false });
var app = express();
var db = new database();

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

var upload = multer({ storage: storage })



app.engine("html", ejs.renderFile);
app.use(express.static(path.join(__dirname, "bower_components")));
app.use(express.static(path.join(__dirname, "public")));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.get('/', function(req, res) {
    res.render("index.html");
})

app.post("/upload", upload.any(), function(req, res) {
    console.log(req.files);
    res.json(req.files);
});

app.get("/getUser", function(req, res) {
    db.getUser(function(data) {
        res.send(data)
    })
})

app.get('/profile', function(req, res) {
    res.json(req.query);
})

app.post('/postData', urlencodeBodyParse, function(req, res) {
    res.json(req.body);
})

app.get("/video", function(req, res) {
    res.render("video.html");
})



app.get("*", function(req, res) {
    res.render("404.html");
});

app.listen(3000, function() {
    console.log("Server Started! Port 3000");
});