import { AcademicYear } from "./AcademicYear";

export interface Term{
    idterm?: number;
    academicYear?: AcademicYear;
    start?: Date;
    end?: Date;
}
