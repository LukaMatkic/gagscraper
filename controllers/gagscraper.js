// Includes
var express = require ('express');
var cheerio = require('cheerio');
var request = require('request');
var mysql = require('./mysql');
var app = express();
//------------------------------------------------------------------------------

// Starting timers
var startScraper = function() {
  // Timer witch checks if there are new posts
  setInterval(function() {
    checkNewPosts(); // Function to start
  }, 60000); // Every minute
}
//------------------------------------------------------------------------------

// Function for checking if there is new post avaliable
var checkNewPosts = function() {
  // Sending request to site
  request('http://www.9gag.com/hot', function(error, response, body) {

    // Vars for saving data
    var $ = cheerio.load(body);
    var link = [];
    var count = 0;

    // For every picture save its HREF link
    $("a").map(function() {
      if(this.attribs.class === "badge-evt badge-track") { // If <a> class is image
        link[count] = removeSlashGag(this.attribs.href); // Saving it but without "/gag/"
        count++;
      }
    });

    saveNewPosts(link);

  });
}
//------------------------------------------------------------------------------

// Functon to remoge first 5 letters, in our case "/gag/" from string
function removeSlashGag(string) {
  var newstring = ''; // Declaring new var
  for(var i=5;i<string.length;i++) { // For every letter
    newstring += string[i]; // Save it
  }
  return newstring; // Return new string
}
//------------------------------------------------------------------------------

// Function for saving new posts
var saveNewPosts = function(link) {
  var check = [];
  var date = require('moment')().format('YYYY-MM-DD');
  var time = require('moment')().format('HH:mm:ss');

  mysql("SELECT url FROM post WHERE date='" + date + "';", function(err, rows, fields) {
    for(var i=0;i<link.length;i++) {
      var temp = false;
      for(var j=0;j<rows.length;j++) {
        if(link[i] === rows[j].url) {
          temp = true;
          continue;
        }
      }
      check[i] = temp;
    }

    var query = "INSERT INTO post (url, date, time) VALUES ";
    for(var i=0;i<link.length;i++) {
      if(check[i] == false) {
        query += "('" + link[i] + "', '" + date + "', '" + time +"'),\n";
        console.log("NEW " +  link[i]);
      }
    }
    query = query.substring(0, query.length - 2);
    if(query[query.length-1] != 'E') {
      mysql(query + ';', function(err, rows, fields) {});
    }

  });

}
//------------------------------------------------------------------------------

// Exporting functions
module.exports = {
  startScraper: startScraper
}
//------------------------------------------------------------------------------
