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
  console.log(req.query);
  let q = req.query;
  //
  fs.readFile(__dirname + "/" + "domande.json", "utf8", function (err, data) {
    // console.log(data);
    //
    let arr = JSON.parse(data);
    let set1,
      set2,
      set3 = [];

    console.log(q.parNonRisp);
    if (q.parNonRisp == "true") {
      console.log(q.parNonRisposte);
      set1 = _.filter(arr, function (o) {
        return o.profile.ok == 0 && o.profile.nok == 0;
      });
      console.log(set1.length);
    }

    if (q.parSbagliate == "true") {
      set2 = _.filter(arr, function (o) {
        return o.profile.nok > 0;
      });
    }

    if (q.parCorrette == "true") {
      set3 = _.filter(arr, function (o) {
        return o.profile.ok > 0;
      });
    }

    arr = _.union(set1, set2, set3);

    //console.log(arr);
    //
    const sampled = _.sample(arr, 10);
    //console.log(sampled);

    res.json(sampled);
  });
});

app.get("/sampleDomandeIntersect", function (req, res) {
  console.log(req.query);
  let q = req.query;
  //
  fs.readFile(__dirname + "/" + "domande.json", "utf8", function (err, data) {
    // console.log(data);
    //
    let arr = JSON.parse(data);

    if (q.parNonRisposte == "true") {
      arr = _.filter(arr, function (o) {
        return o.profile.ok == 0 && o.profile.nok == 0;
      });
    }

    if (q.parSbagliate == "true") {
      arr = _.filter(arr, function (o) {
        return o.profile.nok > 0;
      });
    }

    if (q.parCorrette == "true") {
      arr = _.filter(arr, function (o) {
        return o.profile.ok > 0;
      });
    }

    //console.log(arr);
    //
    const sampled = _.sample(arr, 10);
    //console.log(sampled);

    res.json(sampled);
  });
});

app.post("/sendDataReport_OLD", function (req, res) {
  console.log(req.body);
  // var o = JSON.parse(req.body);

  fs.readFile(__dirname + "/" + "domande.json", "utf8", function (err, data) {
    // console.log(data);
    //
    let arr = JSON.parse(data);

    req.body.forEach((e) => {
      // e == [num, bool]
      console.log(e);
      var found = _.find(arr, function (domanda) {
        return domanda.id === e[0];
      });
      if (found) {
        if (e[1] === true) {
          found.profile.ok++;
        } else {
          found.profile.nok++;
        }
        //
        console.log(found);
      }
    });
    //
    var jsonContent = JSON.stringify(arr);
    fs.writeFile(
      __dirname + "/" + "domande.json",
      jsonContent,
      "utf8",
      function (err) {
        if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
        }

        console.log("JSON file has been saved.");
      }
    );
  });
});

app.post("/sendDataReport", function (req, res) {
  console.log(req.body);
  // var o = JSON.parse(req.body);
  let data = fs.readFileSync(__dirname + "/" + "domande.json", {
    encoding: "utf8",
    flag: "r",
  });
  let arr = JSON.parse(data);
  req.body.forEach((e) => {
    // e == [num, bool]
    console.log(e);
    var found = _.find(arr, function (domanda) {
      return domanda.id === e[0];
    });
    if (found) {
      if (e[1] === true) {
        found.profile.ok++;
      } else {
        found.profile.nok++;
      }
      //
      console.log(found);
    }
  });

  var jsonContent = JSON.stringify(arr);
  fs.writeFileSync(__dirname + "/" + "domande.json", jsonContent, "utf8");
  console.log("JSON file has been saved.");
  return res.json({ ret: "OK" });
});

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
