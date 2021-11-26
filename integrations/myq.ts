type MyQDevice = InstanceType<typeof myQDevice>;
enum GarageDoorCommand {
    OPEN = 'open',
    CLOSE = 'close',
}

const { myQApi, myQDevice } = require("@hjdhjd/myq");
const fs = require('fs');

const data = fs.readFileSync('./configs/myq.json', 'utf8');
const config: {email: string, password: string} = JSON.parse(data);

async function setGarageDoor(command: GarageDoorCommand) {
    const myQ = new myQApi(config.email, config.password);
    await myQ.refreshDevices();
    console.log(myQ.devices);
    const devices: MyQDevice[] = myQ.devices;
    const garageDoors = devices.filter((device) => device.device_family === 'garagedoor');
    console.log('console log', garageDoors);
    garageDoors.forEach(door => {
        myQ.execute(door, command);
    });
}

export async function openGarageDoor(command: GarageDoorCommand) {
    await setGarageDoor(GarageDoorCommand.OPEN);
}

export async function closeGarageDoor(command: GarageDoorCommand) {
    await setGarageDoor(GarageDoorCommand.CLOSE);
}
