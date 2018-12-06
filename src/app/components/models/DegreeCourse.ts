import { TypeDegreeCourse } from "./TypeDegreeCourse";
import { Subject } from "./subject";

export interface DegreeCourse {
    idcourse: number;
    cfu: number;
    typeDegreeCourse: TypeDegreeCourse;
    academicYear: string;
    subjects: Subject[];
}
