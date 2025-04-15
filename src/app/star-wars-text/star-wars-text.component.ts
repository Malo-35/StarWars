import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-star-wars-text',
  standalone: true,
  imports: [],
  templateUrl: './star-wars-text.component.html',
  styleUrls: ['./star-wars-text.component.css']
})
export class StarWarsTextComponent implements OnDestroy {
  texte: string = '';
  showCrawl: boolean = false;
  audio = new Audio('Star-Wars-Theme-Song-By-John-Williams.mp3');

  constructor(private http: HttpClient) {
    this.http.get('PbRencontres.txt', { responseType: 'text' })
      .subscribe(data => this.texte = data);
  }

  lancerIntro(): void {
    this.showCrawl = true;
    this.audio.volume = 0.3; // Volume entre 0.0 (muet) et 1.0 (max)
    this.audio.play();
  }
  

  ngOnDestroy(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
