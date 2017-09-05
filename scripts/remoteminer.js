var util = require('util');
module.exports = {
    run(creep) {
        if (_.sum(creep.carry) == creep.carryCapacity) {
            let flag = Game.flags["Home"];
            if (creep.pos.roomName == flag.pos.roomName && !creep.memory.attack) {
                //Spend another turn moving towards the flag
                //This should prevent creeps from flip-flopping across the border
                creep.moveTo(flag);
                creep.memory.attack = true;
            } else if (creep.pos.roomName == flag.pos.roomName) {
                //Transfer resources
                if (!creep.memory.transferTarget) {
                    let target = util.findNearestEmptyContainer(creep);
                    if (target) {
                        //Send energy to extensions first as they don't regen
                        creep.memory.transferTarget = target.id;
                    }
                }
                let error = creep.transfer(Game.getObjectById(creep.memory.transferTarget),RESOURCE_ENERGY);
                if(error == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.transferTarget));
                } else if (error == ERR_FULL || error == ERR_INVALID_TARGET) {
                    creep.memory.transferTarget = false;
                }
            } else {
                creep.memory.attack = false;
                creep.moveTo(flag);
            }
            if (creep.memory.target) {
                creep.memory.target = false;
            }
        } else {
            let flag = Game.flags[creep.memory.flagName];
            let error = 0;
            if(!creep.memory.target) { 
                if (creep.pos.roomName == flag.pos.roomName && !creep.memory.attack) {
                    //Spend another turn moving towards the flag
                    //This should prevent creeps from flip-flopping across the border
                    creep.moveTo(flag);
                    creep.memory.attack = true;
                } else if (creep.pos.roomName == flag.pos.roomName) {
                    let target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                    if (target) {
                        creep.memory.target = target.id;
                    } else {
                        //No targets
                        creep.moveTo(flag);
                    }
                } else {
                    creep.memory.attack = false;
                    creep.moveTo(flag);
                }
            } else {
                let error = creep.harvest(Game.getObjectById(creep.memory.target));
                if(error == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.target));
                } else if (error == ERR_NOT_ENOUGH_RESOURCES || error == ERR_INVALID_TARGET) {
                    creep.memory.target = false;
                }
            }
        }
    },
    spawn(spawner,flagName) {
        return spawner.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],null,{type: 'remoteminer', attack: false, flagName });
    }
};
