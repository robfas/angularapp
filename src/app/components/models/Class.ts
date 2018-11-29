import { Building } from '../models/Building';
import { Tool } from '../models/Tool';

export interface Class {
    id: number,
    name?: string,
    seats?: number,
    lat?: number,
    lng?: number,
    building?: Building,
    tool?: Tool[]
}
