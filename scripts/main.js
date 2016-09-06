var worker = require('worker');
var builder = require('builder');
for(var i in Game.creeps) {
    if (Game.creeps[i].name == 'BobTheBuilder') {
        worker.run(Game.creeps[i]);
    } else {
        worker.run(Game.creeps[i]);
    }
}
