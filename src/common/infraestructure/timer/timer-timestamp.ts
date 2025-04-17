import { ITimer } from "src/common/application/timer/timer.interface";

export class TimerTimestamp implements ITimer {

    getTime(time1: number, time2: number): number {
        return time2 - time1;
    }
    
    setTime(): number {
        return Date.now();
    }

}