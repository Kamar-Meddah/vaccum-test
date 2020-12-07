import {Status} from "./status.enum";

export interface InputInterface {
    size:string,
    position:string,
    status:Status,
    commands:string
}
