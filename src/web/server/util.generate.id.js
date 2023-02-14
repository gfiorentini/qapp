var fs = require("fs");
const path = require("path");
const _ = require("underscore");

fs.readFile(__dirname + "/" + "domande.json", "utf8", function (err, data) {
    // console.log(data);
    //
    let arr = JSON.parse( data );
    //console.log(arr);
    _.each(arr, function ( item, index ) {
        item._id = index;
        item.profile = { ok: 0, nok: 0 }
    });
    console.log(arr);
    var jsonContent = JSON.stringify(arr, null, 4);
    console.log(jsonContent);
 
    fs.writeFile(__dirname + "/" + "domande2.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
 
        console.log("JSON file has been saved.");
    });
});