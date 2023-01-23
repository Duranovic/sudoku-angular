import { Injectable, OnInit } from '@angular/core';
import { sounds_folder_path } from 'src/environments/environment';
import { SoundsEnum } from '../enums/sound.enum';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private [SoundsEnum.WRONG_MOVE]!: HTMLAudioElement;
  private [SoundsEnum.RIGHT_MOVE]!: HTMLAudioElement;
  private [SoundsEnum.GAME_OVER]!: HTMLAudioElement;
  private [SoundsEnum.INTERACT]!: HTMLAudioElement;
  private [SoundsEnum.COMPLETED]!: HTMLAudioElement;

  constructor() { 
    this[SoundsEnum.WRONG_MOVE] = new Audio(`${sounds_folder_path}wrong-click.mp3`);
    this[SoundsEnum.RIGHT_MOVE] = new Audio(`${sounds_folder_path}success_bell.mp3`);
    this[SoundsEnum.INTERACT] = new Audio(`${sounds_folder_path}select-sound.mp3`);
    this[SoundsEnum.GAME_OVER] = new Audio(`${sounds_folder_path}negative_beeps.mp3`);
    this[SoundsEnum.COMPLETED] = new Audio(`${sounds_folder_path}goodresult.mp3`);
    this.configureSounds();
  }

  private configureSounds(): void {
    this[SoundsEnum.WRONG_MOVE].volume = 0.1;
    this[SoundsEnum.RIGHT_MOVE].volume = 0.5;
    this[SoundsEnum.INTERACT].volume = 0.5;
  }

  public playSound(sound: SoundsEnum): void {
    this[sound].load();
    this[sound].play();
  }
}
