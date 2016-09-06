module.exports = {
    findNearestContainer(creep) {
        return creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: function(object) {
                return object.structureType == STRUCTURE_CONTAINER;
            }
        });
    }
}
