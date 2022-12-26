export class Timer {
    hours!: number;
    minutes!: number;
    seconds!: number;

    constructor(seconds: number) {
        this.calculateTime(seconds);
    }

    public calculateTime(seconds: number): void {
        this.hours = Math.floor(seconds / 3600);
        this.minutes = Math.floor((seconds - (this.hours * 3600)) / 60);
        this.seconds = seconds - (this.hours * 3600) - this.minutes * 60;
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
}