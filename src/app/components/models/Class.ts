import { Building } from '../models/Building';

export interface Class {
    id: number;
	name: string;
	seats: number;
	latitude?: number;
    longitude?: number;
    building?: Building;
}
