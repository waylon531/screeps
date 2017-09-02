const worker = require('worker');
const builder = require('builder');
const upgrader= require('upgrader');
const miner = require('miner');
const soldier = require('soldier');
const garrison = require('garrison');
const transporter = require('transporter');
const util = require('util');

const profiler = require('screeps-profiler');

//profiler.enable();
module.exports.loop = function() {
  profiler.wrap(function() {
var workers = 0;
var miners = [0,0];
var upgraders = 0;
var soldiers = 0;
var garrisons = 0;
var builders = 0;
var transporters = 0;
var spawn = Game.spawns['Spawn1'];
for(var i in Game.creeps) {
    if (Game.creeps[i].memory.type == 'miner' ) {
        miners[Game.creeps[i].memory.source] += 1;
        miner.run(Game.creeps[i]);
    } else if (Game.creeps[i].memory.type == 'worker') {
        workers +=1;
        worker.run(Game.creeps[i]);
    } else if (Game.creeps[i].memory.type == 'soldier') {
        soldiers +=1;
        soldier.run(Game.creeps[i],Game.flags["Attack"]);
    } else if (Game.creeps[i].memory.type == 'garrison') {
        garrisons +=1;
        garrison.run(Game.creeps[i]);
    } else if (Game.creeps[i].memory.type == 'builder') {
        builders +=1;
        builder.run(Game.creeps[i]);
    } else if (Game.creeps[i].memory.type == 'upgrader') {
        upgraders +=1;
        upgrader.run(Game.creeps[i]);
    } else if (Game.creeps[i].memory.type == 'transporter') {
        transporters +=1;
        transporter.run(Game.creeps[i]);
    }
}
//if (spawn.canCreateCreep([CARRY,WORK,MOVE]) == 0) {
    if (transporters < 1) {
        transporter.spawn(spawn);
    } else if (miners[0] < 1) {
        miner.spawn(spawn,0);
    } else if (miners[1] < 3) {
        miner.spawn(spawn,1);
    } else if (upgraders < 2) {
        upgrader.spawn(spawn);
    } else if (workers < 3) {
        worker.spawn(spawn);
    } else if (builders < 2) {
        builder.spawn(spawn);
    } else if (garrisons < 0) {
        garrison.spawn(spawn);
    } else if (soldiers < 0) {
        soldier.spawn(spawn);
    }
//}

  });
}
