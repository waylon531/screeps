var util = require('util');
module.exports = {
    run(creep) {
        var total = _.sum(creep.carry);
        if(total >= creep.carryCapacity) {
            //Clear target
            //Memory[creep.memory.target] -= 1;
            //creep.memory.target = false;
            //Start transferring resources
            creep.memory.transfer = true;
        } else if (total <= 0) {
            //Set mining target
            if (!creep.memory.target) {
                //Set mining target
		//Use the source given when the creep was created
                creep.memory.target = creep.room.find(FIND_SOURCES_ACTIVE)[creep.memory.source].id;
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
            if (!creep.memory.transferTarget && util.findNearestEmptyContainer(creep)) {
                creep.memory.transferTarget = util.findNearestEmptyContainer(creep).id;
                /*if(Game.spawns['Nice'].energy < Game.spawns['Nice'].energyCapacity) {
                    //If spawn is not full
                    creep.memory.transferTarget = Game.spawns['Nice'].id;
                } else if (extensionTarget) {
                    var extensionTarget = util.findNearestEmptyExtension(creep);
                    creep.memory.transferTarget = extensionTarget.id;
                }*/
            } else if (!creep.memory.transferTarget && util.findNearestEmptyExtension(creep)) {
		creep.memory.transferTarget = util.findNearestEmptyExtension(creep).id;
	    } else if (!creep.memory.transferTarget && util.findNearestSpawn(creep)) {
		creep.memory.transferTarget = util.findNearestSpawn(creep).id;
            }
            var error = creep.transfer(Game.getObjectById(creep.memory.transferTarget),RESOURCE_ENERGY);
            if(error == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.transferTarget));
            } else if (error == ERR_FULL || error == ERR_INVALID_TARGET) {
                creep.memory.transferTarget = false;
            }
        }
    },
    spawn(spawner, num) {
        return spawner.createCreep([CARRY,CARRY,WORK,WORK,WORK,MOVE,MOVE],null,{type: 'miner', transfer: false, source: num});
    }
};
