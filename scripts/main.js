var worker = require('worker');
var upgrader= require('upgrader');
var miner = require('miner');
var soldier = require('soldier');
var garrison = require('garrison');
var util = require('util');
var workers = 0;
var miners = 0;
var upgraders = 0;
var soldiers = 0;
var garrisons = 0;
for(var i in Game.creeps) {
    if (Game.creeps[i].memory.type == 'miner') {
        miners += 1;
        miner.run(Game.creeps[i]);
    } else if (Game.creeps[i].memory.type == 'worker') {
        workers +=1;
        worker.run(Game.creeps[i]);
    } else if (Game.creeps[i].memory.type == 'soldier') {
        soldiers +=1;
        soldier.run(Game.creeps[i]);
    } else if (Game.creeps[i].memory.type == 'garrison') {
        garrisons +=1;
        garrison.run(Game.creeps[i]);
    } else if (Game.creeps[i].memory.type == 'upgrader') {
        upgraders +=1;
        upgrader.run(Game.creeps[i]);
    }
}
if (Game.spawns['Nice'].canCreateCreep([CARRY,WORK,MOVE]) == 0) {
    if (miners < 12) {
        miner.spawn(Game.spawns['Nice']);
    } else if (upgraders < 2) {
        upgrader.spawn(Game.spawns['Nice']);
    } else if (workers < 6) {
        worker.spawn(Game.spawns['Nice']);
    } else if (garrisons < 4) {
        garrison.spawn(Game.spawns['Nice']);
    } else if (soldiers < 10) {
        soldier.spawn(Game.spawns['Nice']);
    }
}

