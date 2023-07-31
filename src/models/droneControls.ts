export type DroneControls = {
    thrust: number,
    pitch: number,
    yaw: number,
    // ...other controls
};

export const createDroneControls = (): DroneControls => ({
    thrust: 0,
    pitch: 0,
    yaw: 0,
    // ...other controls
});
