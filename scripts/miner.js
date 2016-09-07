var util = require('util');
module.exports = {
    run(creep) {
        var total = _.sum(creep.carry);
        if(total >=50) {
            //Clear target
            //Memory[creep.memory.target] -= 1;
            //creep.memory.target = false;
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
            creep.memory.transferTarget = false;
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
            if (!creep.memory.transferTarget) {
                creep.memory.transferTarget = util.findNearestEmptyContainer(creep).id;
                /*if(Game.spawns['Nice'].energy < Game.spawns['Nice'].energyCapacity) {
                    //If spawn is not full
                    creep.memory.transferTarget = Game.spawns['Nice'].id;
                } else if (extensionTarget) {
                    var extensionTarget = util.findNearestEmptyExtension(creep);
                    creep.memory.transferTarget = extensionTarget.id;
                }*/
            }
            var error = creep.transfer(Game.getObjectById(creep.memory.transferTarget),RESOURCE_ENERGY);
            if(error == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.transferTarget));
            } else if (error == ERR_FULL || error == ERR_INVALID_TARGET) {
                creep.memory.transferTarget = false;
            }
        }
    },
    spawn(spawner) {
        return spawner.createCreep([CARRY,WORK,WORK,MOVE],null,{type: 'miner', transfer: false});
    }
};
