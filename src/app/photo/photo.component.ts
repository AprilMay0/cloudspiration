import { DataService } from './../services/data.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  @ViewChild('myCanvas') canvasRef: ElementRef;

  texts: any[];
  photos: any[];
  image: any[];
  quote: any[];
  isMobile: boolean;

  constructor(private service: DataService) { }

  ngOnInit() {
    this.isMobile = (window.innerWidth) < 650;

    this.service.getText()
      .subscribe(texts => {
        this.service.getClouds()
          .subscribe(clouds => {
            this.photos = clouds;
            this.texts = texts;
            this.assignQuote(true);
            this.assignImage();
          })
      })


  }

  createImage(quote) {
    if (this.isMobile) {
      this.createMobileImage(quote);
    } else {
      this.createRegularImage(quote);
    }
  }

  createRegularImage(quote) {
    let context: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
    context.font = "30pt Trebuchet MS";
    context.textAlign = "center";
    context.textBaseline = 'middle';
    context.strokeStyle = "black";
    context.fillStyle = "white";
    context.lineWidth = 6;
    let quoteText = this.getLines(context, quote, 500);
    let height = 300 - ((quoteText.length) * 15) - 50;

    let base_image = new Image();
    base_image.setAttribute('crossOrigin', 'anonymous');
    base_image.src = 'https://cloudspiration-e784.restdb.io/media/' + this.image;
    base_image.onload = function () {
      context.drawImage(base_image, 0, 0, 600, 600);
      for (let a in quoteText) {
        height += 50;
        context.strokeText(quoteText[a], 300, height);
        context.fillText(quoteText[a], 300, height);
      }
    }
  }

  createMobileImage(quote) {
    let context: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
    context.font = "15pt Trebuchet MS";
    context.textAlign = "center";
    context.textBaseline = 'middle';
    context.strokeStyle = "black";
    context.fillStyle = "white";
    context.lineWidth = 3;
    let quoteText = this.getLines(context, quote, 250);
    let height = 150 - ((quoteText.length) * 7.5) - 25;

    let base_image = new Image();
    base_image.setAttribute('crossOrigin', 'anonymous');
    base_image.src = 'https://cloudspiration-e784.restdb.io/media/' + this.image;
    base_image.onload = function () {
      context.drawImage(base_image, 0, 0, 300, 300);
      for (let a in quoteText) {
        height += 25;
        context.strokeText(quoteText[a], 150, height);
        context.fillText(quoteText[a], 150, height);
      }
    }
  }

  assignQuote(isInit) {
    let index = Math.floor((Math.random() * this.texts.length));
    this.quote = this.texts[index].text;
    if (!isInit) this.createImage(this.quote)
  }

  assignImage() {
    let index = Math.floor((Math.random() * this.photos.length));    
    this.image = this.photos[index].image[0];
    this.createImage(this.quote);
  }

  getLines(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
      var word = words[i];
      var width = ctx.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  download() {
    let canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    canvas.toBlob(function (blob) {
      FileSaver.saveAs(blob, "inspiracloud.png");
    });
  }

}
