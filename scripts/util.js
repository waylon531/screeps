module.exports = {
    findNearestContainer(creep) {
        return creep.pos.findClosestByRange(FIND_STRUCTURES, {
            //Get closest container
            filter: function(object) {
                return object.structureType == STRUCTURE_CONTAINER;
            }
        });
    },
    findNearestRepairTarget(creep) {
        return creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function(object) {
                //Filter out buildings with full health
                return object.hits < object.hitsMax && object.hits < 1000000; //Don't repair over 1M
            }
        });
    }
}
