var worker = require('worker');
var miner = require('miner');
var util = require('util');
var workers = 0;
var miners = 0;
for(var i in Game.creeps) {
    if (Game.creeps[i].memory.type == 'miner') {
        miners += 1;
        miner.run(Game.creeps[i]);
    } else if (Game.creeps[i].memory.type == 'worker') {
        workers +=1;
        worker.run(Game.creeps[i]);
    }
}
if (Game.spawns['Nice'].canCreateCreep([CARRY,WORK,MOVE]) == 0) {
    if (miners < 8) {
        miner.spawn(Game.spawns['Nice']);
    } else if (workers < 8) {
        worker.spawn(Game.spawns['Nice']);
    }
}

