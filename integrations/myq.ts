import { myQApi, myQDevice } from '@hjdhjd/myq';
import {GarageDoorCommand} from '../types/MyQTypes';

type MyQDevice = myQDevice;

export class MyQ {
    private readonly email;
    private readonly password;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = email;
    }

    async setGarageDoor(command: GarageDoorCommand) {
        const myQ: myQApi = new myQApi(this.email, this.password);
        await myQ.refreshDevices();
        const devices: MyQDevice[] = myQ.devices;
        const garageDoors = devices.filter((device) => device.device_family === 'garagedoor');
        garageDoors.forEach(door => {
            myQ.execute(door, command);
        });
    } // end function

} // end class
