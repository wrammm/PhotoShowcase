import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// import * as imageData from 'src/assets/images/image-list.json';

@Component({
  selector: 'app-background-carousel',
  templateUrl: './background-carousel.component.html',
  styleUrls: ['./background-carousel.component.scss']
})
export class BackgroundCarouselComponent implements OnInit {
  images: string[] = [];
  currentIndex: number = 0;
  columns = '';
  imgArr: number[] = [];
  numberOfColumns = 4;
  imgWidth = window.innerWidth / this.numberOfColumns;
  timerInc = 1;
  inc = 1;
  timer: any;
  startTimer = false;
  timerFreq = 100;
  upperTimerIncLimit = 5;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getFiles();
    this.imgArr = this.createRange(this.numberOfColumns);
    this.setColumnsStyleString(this.numberOfColumns);
  }

  getFiles() {
    this.getJSON().subscribe((data: any) => {
      this.images = data.images;
      let imagesURLs: string[] = [];
      this.images.forEach(imageName => {
        imagesURLs.push('./assets/images/' + imageName);
      });
      this.images = imagesURLs;
      console.log('this.images:', this.images);
    });
  }
  public getJSON(): Observable<any> {
    return this.http.get('./assets/images/image-list.json');
  }

  toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  startStopTimer() {
    this.toggleFullScreen();
    this.startTimer = !this.startTimer;
    if (this.startTimer) {
      this.timer = setInterval(() => {
        if (this.timerInc < 2) {
          this.inc = 1;
        } else if (this.timerInc > this.upperTimerIncLimit) {
          this.inc = -1;
        }
        this.timerInc = this.timerInc + this.inc;
        this.incrementCol(this.inc);
      }, this.timerFreq)
    } else {
      clearInterval(this.timer);
    }
  }

  incTimerUpperLimit(inc: number) {
    if (this.upperTimerIncLimit + inc > 2 && this.upperTimerIncLimit + inc < 30) {
      this.upperTimerIncLimit = this.upperTimerIncLimit + inc;
    }
  }

  createRange(number: number) {
    var items: number[] = [];
    for (var i = 1; i <= number * number; i++) {
      items.push(i);
    }
    return items;
  }

  setColumnsStyleString(numberOfColumns: number) {
    this.columns = '';
    for (var i = 1; i <= numberOfColumns; i++) {
      this.columns = this.columns + '1fr ';
    }
  }

  incrementCol(increment: number) {
    this.numberOfColumns = this.numberOfColumns + increment;
    if (this.numberOfColumns > 0) {
      this.imgArr = this.createRange(this.numberOfColumns);
      this.setColumnsStyleString(this.numberOfColumns);
      this.imgWidth = window.innerWidth / this.numberOfColumns;
    }
  }

  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  previousImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
