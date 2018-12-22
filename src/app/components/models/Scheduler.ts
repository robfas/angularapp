import { Term } from "./term";
import { DegreeCourse } from "./DegreeCourse";
import { TypeLesson } from "./TypeLesson";

export class Scheduler {
    idScheduler?: number;
    term?: Term;
    degreeCourse?: DegreeCourse;
    typeLessons?: TypeLesson[];
}