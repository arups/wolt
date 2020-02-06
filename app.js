var express = require('express');
var app = express();
var fs = require("fs");
const dataset = require('./users.json');

app.get('/restaurants/search', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    let searchv = req.query.q;
    var result=searchValues(searchv);
    var users = JSON.parse( data );
    console.log( users[result] );
    res.end( JSON.stringify(users[result]) );
   });
})

function searchValues(needle) {
    var found = [];
    var re = new RegExp(needle, 'i');
    dataset.forEach(function(item, ix) {
      Object.keys(item).forEach(function(key) {
        if (typeof item[key] !== 'string') return;
        if (item[key].match(re)) {
          if (found.indexOf(ix) === -1) { found.push(ix); }
        }
      });
    });
    //return {searched: needle, indexes:found};
    return found;
  }
  

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})