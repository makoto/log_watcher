var sys = require('sys');
var fu = require('./fu');
var filename = process.ARGV[2];

if (!filename)
  return sys.puts("Usage: node watcher.js filename");

// Look at http://nodejs.org/api.html#_child_processes for detail.
var tail = process.createChildProcess("tail", ["-f", filename]);
sys.puts("start tailing");

fu.listen(8003);
fu.get("/", fu.staticHandler("index.html"));
fu.get("/jquery-1.2.6.min.js", fu.staticHandler("jquery-1.2.6.min.js"));

fu.get("/watch", function  (req, res) {
  res.sendHeader(200,{"Content-Type": "text/plain"});
  tail.addListener("output", function (data) {
    res.sendBody(data + "\n");
    
    // times out after 10 sec 
    setTimeout(function () {
      res.sendBody("Finishing");
      res.finish();
    }, 10 * 1000);
  });    
})