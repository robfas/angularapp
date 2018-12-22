import { Time } from "@angular/common";
import { Scheduler } from "./scheduler";
import { Day } from "./day";
import { TypeSubject } from "./TypeSubject";
import { Class } from "./Class";
import { SubjectStudy } from "./SubjectStudy";

export class TypeLesson {
    idtypeLesson?: number;
    start?: Date;
    end?: Date;
    day?: Day;
    subject?: SubjectStudy;
    classroom?: Class;
    scheduler?: Scheduler;
}
