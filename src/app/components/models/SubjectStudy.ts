import { Teacher } from '../models/Teacher';
import { DegreeCourse } from '../models/DegreeCourse';
import { TypeSubject } from '../models/TypeSubject';

export interface SubjectStudy {
    id: number;
	name: string;
	description?: string;
	degreecourseDTO?: DegreeCourse;
	teacherDTO?: Teacher;
	cfu?: number;
	typeSubjectDTO?: TypeSubject;
}
