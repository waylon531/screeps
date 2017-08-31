module.exports = {
    findNearestContainer(creep) {
        return creep.pos.findClosestByRange(FIND_STRUCTURES, {
            //Get closest container
            filter: function(object) {
                return object.structureType == STRUCTURE_CONTAINER;
            }
        });
    },
    findNearestFullContainer(creep) {
        return creep.pos.findClosestByRange(FIND_STRUCTURES, {
            //Get closest container
            filter: function(object) {
                return object.structureType == STRUCTURE_CONTAINER && object.store[RESOURCE_ENERGY] > 0;
            }
        });
    },
    findNearestEmptyContainer(creep) {
        return creep.pos.findClosestByRange(FIND_STRUCTURES, {
            //Get closest container
            filter: function(object) {
                return object.structureType == ( STRUCTURE_CONTAINER || STRUCTURE_SPAWN || STRUCTURE_EXTENSION ) && _.sum(object.store) < object.storeCapacity;
            }
        });
    },
    findNearestEmptyExtension(creep) {
        return creep.pos.findClosestByRange(FIND_STRUCTURES, {
            //Get closest container
            filter: function(object) {
                return object.structureType == STRUCTURE_EXTENSION && object.energy < object.energyCapacity;
            }
        });
    },
    findNearestRepairTarget(creep) {
        return creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function(object) {
                //Filter out buildings with full health
                return object.hits < object.hitsMax && object.hits < 100000; //Don't repair over 100K
            }
        });
    }
}
