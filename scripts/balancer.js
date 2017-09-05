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
            if (!creep.memory.target && util.findFullestContainer(creep)) {
                //Set mining target
                creep.memory.target = util.findFullestContainer(creep).id;
            }
            creep.memory.transfer = false;
            creep.memory.transferTarget = false;
        }
        if (creep.memory.transfer == false) {
            //Mine
            if(creep.memory.target) {
                var error = creep.withdraw(Game.getObjectById(creep.memory.target),RESOURCE_ENERGY);
                if(error == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.target));
                } else if (error == ERR_NOT_ENOUGH_RESOURCES) {
                    creep.memory.target = false;
                }
            }
        } else {
            //Transfer resources
            if (!creep.memory.transferTarget) {
                let target = util.findLeastFullContainer(creep);
                if (target) {
                    creep.memory.transferTarget = target.id;
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
        return spawner.createCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],null,{type: 'balancer', transfer: false});
    }
};
