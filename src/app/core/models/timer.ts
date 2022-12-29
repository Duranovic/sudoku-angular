import { BehaviorSubject } from "rxjs";

export class Timer {
    private hours: number = 0;
    private minutes: number = 0;
    private seconds: number = 0;
    public timer$!: BehaviorSubject<string>;

    constructor() {
        this.timer$ = new BehaviorSubject(this.getTimerStringFormat());
    }

    public addSecond() {
        if(this.seconds < 59) {
            this.seconds++;
            return;
        } 

        this.seconds = 0;
        if(this.minutes < 59) {
            this.minutes++;
            return;
        }
        this.minutes = 0;
        this.hours++;
    }

    public resetTime(): void {
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.timer$.next(this.getTimerStringFormat());
    }

    public getTimerStringFormat(): string {
        let hours = this.hours < 10 ? `${this.hours}` : this.hours;
        let minutes = this.minutes < 10 ? `${this.minutes}` : this.minutes;
        let seconds = this.seconds < 10 ? `${this.seconds}` : this.seconds;

        if (minutes == 0)
            return `${seconds} sec`;

        if (hours == 0) {
            return `${minutes} min ${seconds} sec`;
        }

        return `${hours} hr ${minutes} min ${seconds} sec`;
    }

    public patchProps(state: Timer) {
        this.seconds = state.seconds;
        this.minutes = state.minutes;
        this.hours = state.hours;
        this.timer$.next(this.getTimerStringFormat());
    }

    public prepareForEncode(): any {
        return {
            hours: this.hours,
            minutes: this.minutes,
            seconds: this.seconds
        };
    }

    public startTimer(): void {
        if(this.seconds !== 0)
            return;

        setInterval(()=>{
            this.addSecond();
            this.timer$.next(this.getTimerStringFormat())
        }, 1000)
    }
}