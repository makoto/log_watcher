var sys = require('sys')
var filename = '/Users/makoto/work/personal/friend_hangman/log/development.log'
// process.watchFile(filename, function (data) {
//   sys.puts("updated..." + data);
// });
// sys.puts("start watching " + filename);

// sys.exec("tail " + filename).addCallback(function (stdout, stderr) {
//   sys.puts("tailing");
//   sys.puts(stdout);
// });



// Look at http://nodejs.org/api.html#_child_processes for detail.
var tail = process.createChildProcess("tail", ["-f", filename]);
sys.puts("start tailing");
tail.addListener("output", function (data) {
  sys.puts(data);
});


// From nodejs.org/jsconf.pdf slide 56
var http = require("http");
http.createServer(function(req,res){
  res.sendHeader(200,{"Content-Type": "text/plain"});
  res.sendBody("Hel");
  res.sendBody("lo\r\n");
  tail.addListener("output", function (data) {
    res.sendBody(data);
  });
  
  
  // 
  // setTimeout(function () {
  //   res.sendBody("World\r\n");
  //   res.finish();
  // }, 2000);
}).listen(8000);