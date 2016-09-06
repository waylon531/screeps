var util = require('util');
module.exports = {
    run(creep) {
        var total = _.sum(creep.carry);
        if(total >=50) {
            //Clear target
            //Memory[creep.memory.target] -= 1;
            creep.memory.target = false;
            //Start transferring resources
            creep.memory.transfer = true;
        } else if (total <= 0) {
            //Set mining target
            if (!creep.memory.target) {
                //Set mining target
                creep.memory.target = _.sample(creep.room.find(FIND_SOURCES_ACTIVE)).id;
                //Use random sampling to fairly evenly distribute workers
            }
            creep.memory.transfer = false;
        }
        if (creep.memory.transfer == false) {
            //Mine
            if(creep.memory.target) {
                if(creep.harvest(Game.getObjectById(creep.memory.target)) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.target));
                }
            }
        } else {
            //Transfer resources
            var target = util.findNearestEmptyContainer(creep);
            if(!target && Game.spawns['Nice'].energy < Game.spawns['Nice'].energyCapacity) {
                //If container is full
                target = Game.spawns['Nice'];
            }
            if(creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    },
    spawn(spawner) {
        return spawner.createCreep([CARRY,WORK,WORK,MOVE],null,{type: 'miner', transfer: false});
    }
};
