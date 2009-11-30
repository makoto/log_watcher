var sys = require('sys')
var filename = process.ARGV[2];

if (!filename)
  return sys.puts("Usage: node watcher.js filename");

// Look at http://nodejs.org/api.html#_child_processes for detail.
var tail = process.createChildProcess("tail", ["-f", filename]);
sys.puts("start tailing");

tail.addListener("output", function (data) {
  sys.puts(data);
});

var summary;
var matched;
var matched = [];
var junk;
var method;
var ip;
var date;
var total;
var time;
var view;
var db;
// From nodejs.org/jsconf.pdf slide 56
var http = require("http");
http.createServer(function(req,res){
  res.sendHeader(200,{"Content-Type": "text/plain"});
  res.sendBody("Hel");
  res.sendBody("lo\r\n");
  tail.addListener("output", function (data) {
    if (data.search(/Processing/) != -1)
    {
      res.sendBody(data);
      matched = data.match(/Processing (.*)\[/)[1].split(' ');
      // ResultsController#index (for 127.0.0.1 at 2009-11-30 01:08:51) 
      method = matched[0];
    }else if(data.search(/Completed in/) != -1)
    { 
      res.sendBody(data);

      matched = data.match(/Completed in (.*)\)/)[1].split(" ");
      // 40ms (View: 12, DB: 2
      total = matched[0].replace(/ms/,"");
      db = matched[2].replace(/,/,"");
      view = matched[4];
      res.sendBody("method:" + method + " total:" + total + " db:" + db + " view: " + view );
      res.sendBody("\n");
    }
  });
}).listen(8000);