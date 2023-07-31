import { Server } from 'socket.io';
import { World } from './models/world';
import { createDrone, applyControlsToDrone } from './models/drone';

const world = new World();
const io = new Server();

io.on('connection', (socket) => {
    const droneId = socket.id; // or generate a unique ID
    const drone = createDrone(droneId);
    world.addDrone(drone);

    socket.on('droneControl', (controls) => {
        const currentDrone = world.getDrones().find(d => d.id === droneId);
        if (currentDrone) {
            const updatedDrone = applyControlsToDrone(currentDrone, controls);
            world.updateDrone(updatedDrone);
        }
    });

    socket.on('disconnect', () => {
        world.removeDrone(droneId);
    });
});

// Update physics for all drones at a fixed interval
setInterval(() => {
    world.updatePhysics();

    // Send updated world state to all clients
    io.emit('worldUpdate', world.getDrones());
}, 1000 / 60); // 60 times per second
