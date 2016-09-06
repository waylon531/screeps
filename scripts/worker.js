/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('worker');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run(creep) {
        if (creep.memory.build == false) {
            var target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if(target) {
                if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
        var total = _.sum(creep.carry);
        //var base = Game.spawns['Nice'];
        var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        if(total >=50) {
        //    if(creep.transfer(base,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //        creep.moveTo(base);   
        //    }
            creep.memory.build = true;
        } else if (total <= 0) {
            creep.memory.build = false;
        }
        if (creep.memory.build == true) {
            if(creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
};
