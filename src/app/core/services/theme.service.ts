import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private currentTheme: string;
    private themes = ['light', 'dark', 'blue', 'silver'];

    constructor() {
        this.currentTheme = 'light'; // Default theme
    }

    public setTheme(theme: string): void {
        this.currentTheme = theme;        
        document.documentElement.setAttribute('data-theme', theme);
    }

    public getCurrentTheme(): string {
        return this.currentTheme;
    }

    public getOtherThemes(): string[] {
        return this.themes.filter((theme) => theme !== this.currentTheme);
    }

    public getAllThemes(): string[] {
        return this.themes;
    }
}