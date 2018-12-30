import { Class } from "./Class";
import { SubjectStudy } from "./SubjectStudy";
import { ExamType } from "./ExamType";
import { ExamStatus } from "./ExamStatus";
import { ExamEnrollment } from "./ExamEnrollment";

export class Exam {
    idexam: number
	classroom: Class
	subject: SubjectStudy
    examtype: ExamType;
    date: Date;
    status: ExamStatus;
    enrollments: ExamEnrollment[];
}
