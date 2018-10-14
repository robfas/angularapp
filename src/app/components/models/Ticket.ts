import { Class } from '../models/Class';
import { Status } from '../models/Status';
import { Teacher } from '../models/Teacher';

export interface Ticket {
    id: number;
    title?: string;
    status?: Status;
    teacher?: Teacher;
    classroom?: Class;
    text?: string;
    date?: Date;
   // messages?: TicketMessage[];
   // note?: string;
}
