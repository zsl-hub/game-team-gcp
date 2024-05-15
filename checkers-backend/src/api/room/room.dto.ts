enum colors {
    "red",
    "black",
    "random"
}

export class createRoom {
    roomId: string;
    roomName: string;
    startingColor: colors;
    isAvailable: boolean;
}