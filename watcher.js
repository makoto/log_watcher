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
tail.addListener("output", function (data) {
  sys.puts(data);
});
sys.puts("start tailing");

