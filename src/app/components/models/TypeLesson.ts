import { Time } from "@angular/common";
import { Scheduler } from "./scheduler";
import { Day } from "./day";

export class TypeLesson {
    id: number;
    scheduler?: Scheduler;
    start?: Time;
    end?: Time;
    day?: Day;
}
