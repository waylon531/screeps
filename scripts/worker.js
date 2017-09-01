var util = require('util');
module.exports = {
    run(creep) {
        if (!creep.memory.pos) {
            creep.memory.pos = creep.pos;
        }
        var total = _.sum(creep.carry);
        var error = 0;
        if (creep.memory.idle == true) {
            if (! creep.pos.inRangeTo(Game.flags["Idle"].pos,2)) {
                creep.moveTo(Game.flags["Idle"].pos);
            } else {
                creep.memory.idleCount -= 1;
                if (creep.memory.idleCount <= 0) {
                    creep.memory.idle=false;
                }
            }
        } else if (creep.memory.refuel == false) {
            //Build
            if (!creep.memory.build && !creep.memory.repair && !creep.memory.upgrade) {
                //choose whether to build or repair
                var buildTarget = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                var repairTarget = util.findNearestRepairTarget(creep);
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
            var target = util.findNearestFullContainer(creep);
            if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                //    if (creep.memory.moveCount > 5) {
                //        creep.moveTo(Game.flags["Idle"].pos);
                //    }
                //    creep.memory.moveCount += 1;  
                //} else {
                //    creep.memory.moveCount = 0;  
                //}
            }
            if (creep.pos.isEqualTo(creep.memory.pos.x,creep.memory.pos.y)) { 
                //After 10 steps of sitting in the same place go into idle mode
                if (creep.memory.idleCount > 10 ) { 
                    creep.memory.idle = true;
                    creep.memory.idleCount = 40; //This is the actual idle time
                }
                creep.memory.idleCount +=1;
            } else {
                creep.memory.idleCount = 0;
            }
            creep.memory.pos = creep.pos;
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
        return spawner.createCreep([CARRY,CARRY,WORK,WORK,MOVE,MOVE],null,{type: 'worker',refuel: true,'idleCount': 0 });
    }
};
