import {Slot} from './slot';

export interface Course {
    course_id: number;
    course_name: string;
    slots: Slot[];

}