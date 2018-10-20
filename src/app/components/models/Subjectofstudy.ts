import { Teacher } from '../models/Teacher';
import { Course } from '../models/Course';

export interface Subjectofstudy {
    id: number;
	name: string;
	description: string;
	course: Course;
	teacher: Teacher;
}
