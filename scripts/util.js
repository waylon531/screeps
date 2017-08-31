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
                return ( object.structureType == STRUCTURE_CONTAINER  && object.store[RESOURCE_ENERGY] > 0 ) || ( object.structureType == STRUCTURE_SPAWN && object.energy > 0 ) ;
            }
        });
    },
    findNearestEmptyContainer(creep) {
        return creep.pos.findClosestByRange(FIND_STRUCTURES, {
            //Get closest container
            filter: function(object) {
                return object.structureType == STRUCTURE_CONTAINER && _.sum(object.store) < object.storeCapacity;
            }
        });
    },
    findNearestSpawn(creep) {
        return creep.pos.findClosestByRange(FIND_STRUCTURES, {
            //Get closest container
            filter: function(object) {
                return object.structureType == STRUCTURE_SPAWN;
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
