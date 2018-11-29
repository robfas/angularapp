import { TypeDegreeCourse } from "./TypeDegreeCourse";

export interface DegreeCourse {
    idcourse: number;
    cfu: number;
    typeDegreeCourse: TypeDegreeCourse;
    academicYear: string;
}
