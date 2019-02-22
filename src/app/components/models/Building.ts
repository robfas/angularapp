import { Class } from '../models/Class';

export interface Building {
    id?: number;
	name?: string;
	address?: string;
	lat?: number;
	lng?: number;
	classrooms?: Class[];
	pic?: String;
}
