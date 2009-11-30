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
var trimmed_data;
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
      summary = data.match(/Processing (.*)\[/)[1];
    }else if(data.search(/Completed in/) != -1)
    { 
      res.sendBody(data);
      trimmed_data = data.replace(/^\s+|\s+$/g,"");
      res.sendBody(summary + data.match(/Completed in (.*)\)/)[1]);
      res.sendBody("\n");
    }
  });
}).listen(8000);