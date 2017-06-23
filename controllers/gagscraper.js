// Includes
var express = require ('express');
var cheerio = require('cheerio');
var request = require('request');
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

// Exporting functions
module.exports = {
  startScraper: startScraper
}
//------------------------------------------------------------------------------
