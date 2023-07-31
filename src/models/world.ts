import { Drone, applyPhysicsToDrone } from './drone';

export class World {
    drones: Drone[] = [];
    gravity: number = 9.8; // Earth's gravity in m/s^2
    airResistance: number = 0.1; // Some arbitrary air resistance value

    addDrone(drone: Drone): void {
        this.drones.push(drone);
    }

    removeDrone(droneId: string): void {
        this.drones = this.drones.filter(drone => drone.id !== droneId);
    }

    updateDrone(updatedDrone: Drone): void {
        const droneIndex = this.drones.findIndex(drone => drone.id === updatedDrone.id);
        if (droneIndex !== -1) {
            this.drones[droneIndex] = updatedDrone;
        }
    }

    getDrones(): Drone[] {
        return this.drones;
    }

    updatePhysics(): void {
        this.drones = this.drones.map(drone => applyPhysicsToDrone(drone, this.gravity, this.airResistance));
    }
}
