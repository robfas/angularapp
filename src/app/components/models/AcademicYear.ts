import { Term } from "./Term";

export interface AcademicYear{ 
    idacademicYear: number;
    year?: number;
    terms?: Term[];
}
