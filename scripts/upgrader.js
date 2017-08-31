var util = require('util');
module.exports = {
    run(creep) {
        var total = _.sum(creep.carry);
        var error = 0;
        if (creep.memory.refuel == false) {
            //Build
            if (!creep.memory.build && !creep.memory.repair && !creep.memory.upgrade) {
                //choose whether to build or repair
                var buildTarget = false;//creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                var repairTarget = false;//util.findNearestRepairTarget(creep);
                var controllerTarget = creep.room.controller;
                if (repairTarget) {
                    creep.memory.target = repairTarget.id;
                    creep.memory.repair = true;
                } else if(buildTarget) {
                    creep.memory.build = true;
                    creep.memory.target = buildTarget.id;
                } else if (controllerTarget) {
                    creep.memory.upgrade = true;   
                    creep.memory.target = controllerTarget.id;
                }
            } else {
                if(creep.memory.build) {
                    error = creep.build(Game.getObjectById(creep.memory.target));
                    if(error == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.target));
                    }
                }else if (creep.memory.repair){
                    error = creep.repair(Game.getObjectById(creep.memory.target));
                    if(error == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.target));
                    }
                }else if (creep.memory.upgrade){
                    error = creep.upgradeController(Game.getObjectById(creep.memory.target));
                    if(error == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.target));
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
        if(total <=0 || error == ERR_INVALID_TARGET || (creep.memory.repair && Game.getObjectById(creep.memory.target).hits == Game.getObjectById(creep.memory.target).hitsMax )) {
            //Reset build/repair bit
            creep.memory.build = false;
            creep.memory.repair = false;
            creep.memory.upgrade = false;
            //Set refuel bit
            creep.memory.refuel = true;
        } else if (total > 0) {
            //Stop refueling
            creep.memory.refuel = false;
        }
    },
    spawn(spawner) {
        return spawner.createCreep([CARRY,WORK,WORK,MOVE],null,{type: 'upgrader',refuel: true});
    }
};
