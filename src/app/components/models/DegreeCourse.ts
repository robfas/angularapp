import { TypeDegreeCourse } from "./TypeDegreeCourse";
import { SubjectStudy } from "./SubjectStudy";

export interface DegreeCourse {
    idcourse: number;
    cfu: number;
    typeDegreeCourse: TypeDegreeCourse;
    academicYear: string;
    subjects: SubjectStudy[];
}
