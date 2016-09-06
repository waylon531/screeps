var worker = require('worker');
for(var i in Game.creeps) {
    worker.run(Game.creeps[i]);
}
