var util = require('util');
module.exports = {
    run(creep) {
        let flag = Game.flags[creep.memory.flagName];
        let error = 0;
        if(!creep.memory.target) { 
            if (creep.pos.roomName == flag.pos.roomName && !creep.memory.attack) {
                //Spend another turn moving towards the flag
                //This should prevent creeps from flip-flopping across the border
                creep.moveTo(flag);
                creep.memory.attack = true;
            } else if (creep.pos.roomName == flag.pos.roomName) {
                let target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                    filter: function(object) {
                        //Find buildings that we can steal energy from
                        return ( 
                            ( ( ( object.structureType == STRUCTURE_SPAWN || object.structureType == STRUCTURE_EXTENSION ) && object.energy ) ||
                              ( ( object.structureType == STRUCTURE_CONTAINER || object.structureType == STRUCTURE_STORAGE ) && object.store[RESOURCE_ENERGY]) ) &&
                            ( ! util.onWhitelist(object.owner) );
                            }
                            });
                        //var creepDefenseTarget = Game.spawns["Nice"].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                        //if (creepDefenseTarget) {
                        //    creep.memory.target = creepDefenseTarget.id;
                        //Mine
                        if (target) {
                            creep.memory.target = creepTarget.id;
                        } else {
                            //No targets
                            creep.moveTo(flag);
                        }
                        } else {
                            creep.memory.attack = false;
                            creep.moveTo(flag);
                        }
            } else {
                let error = creep.withdraw(Game.getObjectById(creep.memory.target),RESOURCE_ENERGY);
                if(error == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.target));
                } else if (error == ERR_NOT_ENOUGH_RESOURCES || error == ERR_INVALID_TARGET) {
                    creep.memory.target = false;
                }
            }
            if (_.sum(creep.carry) == creep.carryCapacity) {
                let flag = Games.flags["Home"];
                if (creep.pos.roomName == flag.pos.roomName && !creep.memory.attack) {
                    //Spend another turn moving towards the flag
                    //This should prevent creeps from flip-flopping across the border
                    creep.moveTo(flag);
                    creep.memory.attack = true;
                } else if (creep.pos.roomName == flag.pos.roomName) {
                    //Transfer resources
                    if (!creep.memory.transferTarget) {
                        var extensionTarget = util.findNearestEmptyExtension(creep);
                        let spawnTarget = util.findNearestSpawn(creep);
                        if (extensionTarget) {
                            //Send energy to extensions first as they don't regen
                            creep.memory.transferTarget = extensionTarget.id;
                        } else if(spawnTarget.energy < spawnTarget.energyCapacity) {
                            //If spawn is not full
                            creep.memory.transferTarget = spawnTarget.id;
                        }
                    }
                    var error = creep.transfer(Game.getObjectById(creep.memory.transferTarget),RESOURCE_ENERGY);
                    if(error == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.transferTarget));
                    } else if (error == ERR_FULL || error == ERR_INVALID_TARGET) {
                        creep.memory.transferTarget = false;
                    }
                } else {
                    creep.memory.attack = false;
                    creep.moveTo(flag);
                }
            }

        }

    },
    spawn(spawner,flagName) {
        return spawner.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],null,{type: 'thief', attack: false, flagName });
    }
};
