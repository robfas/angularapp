import { Teacher } from '../models/Teacher';
import { DegreeCourse } from '../models/DegreeCourse';

export interface Subjectofstudy {
    id: number;
	name: string;
	description: string;
	degreecourse: DegreeCourse;
	teacher: Teacher;
}
