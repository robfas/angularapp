import { Class } from '../models/Class';
import { TicketStatus } from '../models/TicketStatus';
import { Teacher } from '../models/Teacher';
import { Employee } from '../models/Employee';
import { TicketMessage } from './TicketMessage';

export interface Ticket {
    id?: number;
    title?: string;
    ticketStatus?: TicketStatus;
    teacher?: Teacher;
    employee?: Employee;
    classroom?: Class;
    date?: Date;
    ticketmessages?: TicketMessage[];
}
