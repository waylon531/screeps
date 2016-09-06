module.exports = {
    findNearestContainer(creep) {
        return creep.pos.findClosestByRange(FIND_STRUCTURES, {
            //Store in closest non-full container
            filter: function(object) {
                return object.structureType == STRUCTURE_CONTAINER && _.sum(object.store) < object.storeCapacity;
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
