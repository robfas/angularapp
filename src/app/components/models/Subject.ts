import { Teacher } from '../models/Teacher';
import { DegreeCourse } from '../models/DegreeCourse';
import { TypeSubject } from '../models/TypeSubject';

export interface Subject {
    id: number;
	name: string;
	description: string;
	degreecourseDTO: DegreeCourse;
	teacherDTO: Teacher;
	cfu: number;
	typeSubjectDTO: TypeSubject;
}
