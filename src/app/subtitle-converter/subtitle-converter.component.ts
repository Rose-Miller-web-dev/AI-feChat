import { Component } from '@angular/core';

@Component({
  selector: 'app-subtitle-converter',
  templateUrl: './subtitle-converter.component.html'
})
export class SubtitleConverterComponent {
  // jsonSubtitles: any[]; // Placeholder for the provided JSON data

  convertToSRT(jsonSubtitles): string {
    let srt = '';
    let counter = 1;

    for (const subtitle of jsonSubtitles) {
      const startTime = this.formatTime(subtitle.start);
      const endTime = this.formatTime(subtitle.end);

      srt += `${counter}\n${startTime} --> ${endTime}\n${subtitle.text}\n\n`;
      counter++;
    }

    return srt;
  }

  private formatTime(time: string): string {
    const seconds = parseFloat(time);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const formattedSeconds = (seconds % 60).toFixed(2).replace('.', ',');
    const formattedMinutes = (minutes % 60).toString().padStart(2, '0');
    const formattedHours = hours.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
}
