import { User } from "./User";

export interface TicketMessage{
    idticketmessage: number;
	idticket: number;
    user: User;
    text: string;
    date: Date;
}