import { Building } from '../models/Building';
import { Instrument } from '../models/Instrument';

export interface Class {
    id: number;
	name: string;
	seats: number;
	latitude?: number;
    longitude?: number;
    building?: Building;
    instruments?: Instrument[]; 
}
