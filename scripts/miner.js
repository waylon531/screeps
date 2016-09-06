var util = require('util');
module.exports = {
    run(creep) {
        var total = _.sum(creep.carry);
        if (creep.memory.transfer == false) {
            //Mine
            var target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if(target) {
                if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        } else {
            //Transfer resources
            var target = util.findNearestContainer(creep);
            if(creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        if(total >=50) {
            creep.memory.transfer = true;
        } else if (total <= 0) {
            creep.memory.transfer = false;
        }
    },
    spawn(spawner) {
        return spawner.createCreep([CARRY,WORK,MOVE],null,{type: 'miner', transfer: false});
    }
};
