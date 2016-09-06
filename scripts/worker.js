var util = require('util');
module.exports = {
    run(creep) {
        var total = _.sum(creep.carry);
        if (creep.memory.refuel == false) {
            //Build
            if (!creep.memory.build && !creep.memory.repair) {
                //choose whether to build or repair
                var buildTarget = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                var repairTarget = creep.pos.findClosestByRange(FIND_STRUCTURES);
                if(buildTarget) {
                    creep.memory.build = true;
                    creep.memory.target = buildTarget;
                } else if (repairTarget) {
                    creep.memory.target = repairTarget;
                    creep.memory.repair = true;
                }
            } else {
                if(creep.memory.build) {
                    if(creep.build(creep.memory.target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.memory.target);
                    }
                }else if (creep.memory.repair){
                    if(creep.repair(creep.memory.target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.memory.target);
                    }
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
            //Reset build/repair bit
            creep.memory.build = false;
            creep.memory.repair = false;
            //Set refuel bit
            creep.memory.refuel = true;
        } else if (total > 0) {
            //Stop refueling
            creep.memory.refuel = false;
        }
    },
    spawn(spawner) {
        return spawner.createCreep([CARRY,WORK,MOVE],null,{type: 'worker',refuel: true});
    }
};
