import { User } from "./User";

export interface TicketMessage{
    idticketmessage: number;
	idticket: number;
    user_ssn: String;
    text: string;
    date: Date;
}