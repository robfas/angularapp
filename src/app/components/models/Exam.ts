import { Class } from "./Class";
import { SubjectStudy } from "./SubjectStudy";
import { ExamType } from "./ExamType";

export class Exam {
    idexam: number
	classroom: Class
	subject: SubjectStudy
    examtype: ExamType;
    date: Date
}
