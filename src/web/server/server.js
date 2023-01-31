var express = require("express");
var app = express();
var cors = require("cors");
var fs = require("fs");
const path = require("path");
const _ = require("underscore");

const PORT = 3000;
let books = [];

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// safe
app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/listDomande", function (req, res) {
  fs.readFile(__dirname + "/" + "domande.json", "utf8", function (err, data) {
    console.log(data);
    res.end(data);
  });
});

app.get("/sampleDomande", function (req, res) {
  fs.readFile(__dirname + "/" + "domande.json", "utf8", function (err, data) {
    // console.log(data);
    //
    let arr = JSON.parse( data );
    //console.log(arr);
    //
    const sampled = _.sample( arr, 10 );
    console.log(sampled);

    res.json(sampled);
  });
});

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
