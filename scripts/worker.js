var util = require('util');
module.exports = {
    run(creep) {
        var total = _.sum(creep.carry);
        if (creep.memory.refuel == false) {
            //Build
            var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        } else {
            //Refuel
            var target = util.findNearestContainer(creep);
            if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        if(total <=0) {
            creep.memory.refuel = true;
        } else if (total > 0) {
            creep.memory.refuel = false;
        }
    },
    spawn(spawner) {
        spawner.createCreep([CARRY,WORK,MOVE],null,{type: 'worker',refuel: true});
    }
};
