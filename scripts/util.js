module.exports = {
    findNearestContainer(creep) {
        return creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function(object) {
                return object.structureType == STRUCTURE_CONTAINER;
            }
        });
    },
    findNearestRepairTarget(creep) {
        return creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function(object) {
                //Filter out buildings with full health
                return object.hits < object.hitsMax;
            }
        });
    }
}
