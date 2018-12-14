import { AcademicYear } from "./AcademicYear";

export interface Term{
    idterm: number;
    academicYear: AcademicYear;
    number: number;
    start: Date;
    end: Date;
}
