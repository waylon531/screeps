module.exports = {
    onWhitelist(name) {
        let whitelist = [ "gector" ];
        return whitelist.includes(name);
    },
    findNearestContainer(creep) {
        return creep.pos.findClosestByPath(FIND_STRUCTURES, {
            //Get closest container
            filter: function(object) {
                return object.structureType == STRUCTURE_CONTAINER;
            }
        });
    },
    findFullestContainer(creep) {
        let containers = creep.room.find(FIND_STRUCTURES, {
            //Get closest container
            filter: function(object) {
                return object.structureType == STRUCTURE_CONTAINER;
            }
        });
        let max = 0;
        var fin;
        for (var i=0; i < containers.length; i++) {
            let container = containers[i];
            if (container.store[RESOURCE_ENERGY] > max) {
                max = container.store[RESOURCE_ENERGY];
                fin = container;
            } 
        }
        return fin;
    },
    findLeastFullContainer(creep) {
        let containers = creep.room.find(FIND_STRUCTURES, {
            filter: function(object) {
                return object.structureType == STRUCTURE_CONTAINER;
            }
        });
        let min = containers[0].store[RESOURCE_ENERGY];
        let fin = containers[0];
        for (var i=1; i < containers.length; i++) {
            let container = containers[i];
            if (container.store[RESOURCE_ENERGY] < min) {
                min = container.store[RESOURCE_ENERGY];
                fin = container;
            } 
        }
        return fin;
    },
    findNearestFullContainer(creep) {
        return creep.pos.findClosestByPath(FIND_STRUCTURES, {
            //Get closest container
            filter: function(object) {
                return object.structureType == STRUCTURE_CONTAINER  && object.store[RESOURCE_ENERGY] > 0;
            }
        });
    },
    findNearestEmptyContainer(creep) {
        return creep.pos.findClosestByPath(FIND_STRUCTURES, {
            //Get closest container
            filter: function(object) {
                return object.structureType == STRUCTURE_CONTAINER && _.sum(object.store) < object.storeCapacity;
            }
        });
    },
    findNearestSpawn(creep) {
        return creep.pos.findClosestByPath(FIND_MY_SPAWNS);
    },
    findNearestEmptyExtension(creep) {
        return creep.pos.findClosestByPath(FIND_STRUCTURES, {
            //Get closest container
            filter: function(object) {
                return object.structureType == STRUCTURE_EXTENSION && object.energy < object.energyCapacity;
            }
        });
    },
    findNearestTower(creep) {
        return creep.pos.findClosestByPath(FIND_STRUCTURES, {
            //Get closest container
            filter: function(object) {
                return object.structureType == STRUCTURE_TOWER && object.energy < object.energyCapacity;
            }
        });
    },
    findNearestRepairTarget(creep) {
        return creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: function(object) {
                //Filter out buildings with full health
                return object.hits < object.hitsMax && object.hits < 100000; //Don't repair over 100K
            }
        });
    },
    findNearestRepairTargetNoCap(creep) {
        return creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: function(object) {
                //Filter out buildings with full health
                return object.hits < object.hitsMax;
            }
        });
    }
}
