const balancer = require('balancer');
const builder = require('builder');
const garrison = require('garrison');
const miner = require('miner');
const remoteminer = require('remoteminer');
const repair = require('repair');
const soldier = require('soldier');
const thief = require('thief');
const transporter = require('transporter');
const upgrader= require('upgrader');
const util = require('util');
const worker = require('worker');

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
        var balancers = 0;
        var repairs = 0;
        var thiefs = {'Raid1': 0, 'Raid2': 0};
        var remoteminers = {'Mine1': 0, 'Mine2': 0};
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
            } else if (Game.creeps[i].memory.type == 'repair') {
                repairs +=1;
                repair.run(Game.creeps[i]);
            } else if (Game.creeps[i].memory.type == 'upgrader') {
                upgraders +=1;
                upgrader.run(Game.creeps[i]);
            } else if (Game.creeps[i].memory.type == 'thief') {
                thiefs[Game.creeps[i].memory.flagName] +=1;
                thief.run(Game.creeps[i]);
            } else if (Game.creeps[i].memory.type == 'remoteminer') {
                remoteminers[Game.creeps[i].memory.flagName] +=1;
                remoteminer.run(Game.creeps[i]);
            } else if (Game.creeps[i].memory.type == 'transporter') {
                transporters +=1;
                transporter.run(Game.creeps[i]);
            } else if (Game.creeps[i].memory.type == 'balancer') {
                balancers +=1;
                balancer.run(Game.creeps[i]);
            }
        }
        //if (spawn.canCreateCreep([CARRY,WORK,MOVE]) == 0) {
        if (transporters < 3) {
            transporter.spawn(spawn);
        } else if (miners[0] < 1) {
            miner.spawn(spawn,0);
        } else if (miners[1] < 1) {
            miner.spawn(spawn,1);
        } else if (balancers < 1) {
            balancer.spawn(spawn);
        } else if (upgraders < 2) {
            upgrader.spawn(spawn);
        } else if (workers < 2) {
            worker.spawn(spawn);
        } else if (repairs < 2) {
            repair.spawn(spawn);
        } else if (builders < 1) {
            builder.spawn(spawn);
        } else if (remoteminers['Mine1'] < 2) {
            remoteminer.spawn(spawn,'Mine1');
        } else if (remoteminers['Mine2'] < 2) {
            remoteminer.spawn(spawn,'Mine2');
        } else if (garrisons < 2) {
            garrison.spawn(spawn);
        } else if (thiefs['Raid1'] < 1) {
            thief.spawn(spawn,'Raid1');
        } else if (thiefs['Raid2'] < 1) {
            thief.spawn(spawn,'Raid2');
        } else if (soldiers < 0) {
            soldier.spawn(spawn);
        }

        //Shoot from towers
        for (var room in Game.rooms) {
            var towers = Game.rooms[room].find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            towers.forEach( tower => {
                let hostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                let injured = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
                        filter: function(object) {
                            return ( object.hits < object.hitsMax );
                        } } );
                if (hostile) {
                    tower.attack(hostile);
                } else if (injured) {
                    tower.heal(injured);
                } else if (tower.energy > tower.energyCapacity/2) {
                    //heal
                    tower.repair(util.findNearestRepairTargetNoCap(tower));
                }
            });
        }

    });
}
