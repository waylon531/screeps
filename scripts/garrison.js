var util = require('util');
module.exports = {
    run(creep) {
        var error = 0;
        if(!creep.memory.target) { 
                var creepTarget = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                var structureTarget = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
            //var creepDefenseTarget = Game.spawns["Nice"].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            //if (creepDefenseTarget) {
            //    creep.memory.target = creepDefenseTarget.id;
                if (creepTarget) {
                    creep.memory.target = creepTarget.id;
                }else if (structureTarget) {
                    creep.memory.target = structureTarget.id;
                } else {
                    creep.moveTo(Game.flags["Garrison"]);
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
        return spawner.createCreep([ATTACK,ATTACK,MOVE,MOVE],null,{type: 'garrison'});
    }
};
