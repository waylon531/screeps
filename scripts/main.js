var worker = require('worker');
var mine= require('miner');
for(var i in Game.creeps) {
    if (Game.creeps[i].memory.type == 'miner') {
        miner.run(Game.creeps[i]);
    } else if (Game.creeps[i].memory.type == 'worker') {
        worker.run(Game.creeps[i]);
    }
}
