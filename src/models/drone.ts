import { DroneControls } from './droneControls';

export type Drone = {
    id: string;
    thrust: number;
    pitch: number;
    yaw: number;
    mass: number;
    velocity: number;
    // ... other state
};

export const createDrone = (id: string): Drone => ({
    id,
    thrust: 0,
    pitch: 0,
    yaw: 0,
    mass: 1,
    velocity: 0,
    // ... other state
});

export const applyPhysicsToDrone = (drone: Drone, gravity: number, airResistance: number): Drone => {
    // Calculate the net force acting on the drone
    const netForce = drone.thrust - gravity * drone.mass - airResistance * drone.velocity;

    // Use F = ma to update drone velocity
    const newVelocity = drone.velocity + netForce / drone.mass;

    return { ...drone, velocity: newVelocity };
};

export const applyControlsToDrone = (drone: Drone, controls: DroneControls): Drone => ({
    ...drone,
    thrust: drone.thrust + controls.thrust,
    pitch: drone.pitch + controls.pitch,
    yaw: drone.yaw + controls.yaw,
    // ... update other state based on controls
});
