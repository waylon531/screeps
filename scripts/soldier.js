var util = require('util');
module.exports = {
    run(creep,flag) {
        var error = 0;
        if(!creep.memory.target) { 
            if (creep.pos.roomName == flag.pos.roomName) {
                var creepTarget = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                    filter: function(object) {
                        return ! util.onWhitelist(object.owner) ;
                    }
                });
                var structureTarget = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                    filter: function(object) {
                        return object.structureType != STRUCTURE_CONTROLLER && ( ! util.onWhitelist(object.owner) );
                    }
                });
            //var creepDefenseTarget = Game.spawns["Nice"].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            //if (creepDefenseTarget) {
            //    creep.memory.target = creepDefenseTarget.id;
                if (creepTarget) {
                    creep.memory.target = creepTarget.id;
                }else if (structureTarget) {
                    creep.memory.target = structureTarget.id;
                } else {
                    //No targets
                    creep.moveTo(flag);
                }
            } else {
                creep.moveTo(flag);
            }
        } else {
            error = creep.attack(Game.getObjectById(creep.memory.target));
            if(error == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.target));
            }
        }
        if (error == ERR_INVALID_TARGET) {
            creep.memory.target = false;
        }
    },
    spawn(spawner) {
        return spawner.createCreep([TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE],null,{type: 'soldier'});
    }
};
