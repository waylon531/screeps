var util = require('util');
module.exports = {
    run(creep) {
        var total = _.sum(creep.carry);
        if(total >0) {
            //Clear target
            creep.memory.target = false;
            //Start transferring resources
            creep.memory.transfer = true;
        } else if (total <= 0) {
            //Set mining target
            if (!creep.memory.target && util.findNearestFullContainer(creep)) {
                //Set mining target
                creep.memory.target = util.findNearestFullContainer(creep).id;
            }
            creep.memory.transfer = false;
            creep.memory.transferTarget = false;
        }
        if (creep.memory.transfer == false) {
            //Mine
            if(creep.memory.target) {
                if(creep.withdraw(Game.getObjectById(creep.memory.target),RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.target));
                }
            }
        } else {
            //Transfer resources
            if (!creep.memory.transferTarget) {
                var extensionTarget = util.findNearestEmptyExtension(creep);
                if(Game.spawns['Nice'].energy < Game.spawns['Nice'].energyCapacity) {
                    //If spawn is not full
                    creep.memory.transferTarget = Game.spawns['Nice'].id;
                } else if (extensionTarget) {
                    creep.memory.transferTarget = extensionTarget.id;
                }
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
        return spawner.createCreep([CARRY,CARRY,MOVE],null,{type: 'transporter', transfer: false});
    }
};
