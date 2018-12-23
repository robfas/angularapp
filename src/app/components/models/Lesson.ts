import { TypeLesson } from "./TypeLesson";
import { Class } from "./Class";
import { LessonFile } from "./LessonFile";

export class Lesson {
    idlesson: number;
    classroom: Class;
    start: Date;
    end: Date;
    typeLesson: TypeLesson;
    lessonFiles: LessonFile[];
}
